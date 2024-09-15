import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Define types for the state passed from SeatManagement
type PaymentSeat = {
  seatid: string;
  seat_number: string;
};

type PaymentState = {
  selectedSeats: PaymentSeat[];
  totalPriceUSD: string;
  showtimeId: string;
};

export default function PaymentPage() {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate(); // Add navigation

  // UseLocation to retrieve the state passed from SeatManagement
  const location = useLocation();
  const { selectedSeats, totalPriceUSD, showtimeId } =
    location.state as PaymentState;

  const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);

  // Ensure selectedSeats, totalPriceUSD, and showtimeId exist
  if (!selectedSeats || !totalPriceUSD || !showtimeId) {
    return <div>Error: Missing required seat or showtime data.</div>;
  }

  const onApprove = async (data: any, actions: any) => {
    if (!actions.order) {
      toast.error("Order actions are undefined. Please try again.");
      return;
    }

    try {
      await actions.order.capture();
      setPaymentComplete(true); // Mark payment as complete
      toast.success("Payment successful!");
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const makeBookingRequest = async () => {
    try {
      // Extract seat IDs and seat numbers for the booking request
      const seatIds = selectedSeats.map((seat) => seat.seatid);
      const seatNumbers = selectedSeats.map((seat) => seat.seat_number);

      // Prepare the payload for the booking API
      const bookingData = {
        user_id: userId,
        showtime_id: showtimeId,
        seat_ids: seatIds,
      };

      // Make the booking request to the API
      const response = await axios.post(
        "http://localhost:4000/booking",
        bookingData
      );

      if (response.status === 200) {
        toast.success("Booking successful!");
        setBookingComplete(true);

        // Navigate to the TicketPage and pass the booking details along with seat numbers
        const bookingId = response.data.booking_id; // Assuming booking ID is returned
        navigate("/ticket", {
          state: { showtimeId, userId, seatNumbers, bookingId, totalPriceUSD }, // Pass totalPriceUSD to TicketPage
        });
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking failed", error);
      toast.error(
        "An error occurred while making the booking. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Payment for Selected Seats
        </h1>

        {/* Display Selected Seats */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Selected Seats
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            {selectedSeats.map((seat) => (
              <li key={seat.seatid}>{seat.seat_number}</li>
            ))}
          </ul>
        </div>

        {/* Display Total Price */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Total Price</h2>
          <p className="text-2xl font-bold text-gray-700">${totalPriceUSD}</p>
        </div>

        {/* PayPal Buttons */}
        <div className="mt-6">
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: totalPriceUSD,
                    },
                  },
                ],
              });
            }}
            onApprove={onApprove}
            onError={(err) => {
              console.error("PayPal error", err);
              toast.error("An error occurred with PayPal. Please try again.");
            }}
          />
        </div>

        {/* Complete Booking Button (Visible after Payment) */}
        {paymentComplete && !bookingComplete && (
          <button
            className="mt-6 w-full py-3 rounded-lg bg-green-600 text-white text-lg font-semibold hover:bg-green-700 transition duration-300"
            onClick={makeBookingRequest}
          >
            Complete Booking
          </button>
        )}

        {/* Show a success message if booking is complete */}
        {bookingComplete && (
          <div className="mt-6 w-full py-3 rounded-lg bg-green-100 text-green-800 text-lg font-semibold text-center">
            Booking confirmed! Redirecting to your ticket...
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
