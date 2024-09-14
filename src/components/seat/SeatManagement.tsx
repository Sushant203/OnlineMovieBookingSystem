import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../loader/Loader";

type Seat = {
  seat_number: string;
  seatid: string;
  status: string; // Available, Reserved, or Booked
};

type Params = {
  movieId: string;
  theaterId: string;
  showtimeId: string;
};

const PRICE_PER_SEAT_USD = 5.0; // Fixed price per seat in USD

export default function SeatManagement() {
  const userId = localStorage.getItem("user_id");
  const { showtimeId } = useParams<Params>();
  const navigate = useNavigate();

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/seat/${showtimeId}`
        );
        setSeats(response.data);
      } catch (error) {
        console.error("Failed to fetch seats", error);
        toast.error(
          "An error occurred while fetching seats. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (showtimeId) {
      fetchSeats();
    }
  }, [showtimeId]);

  const handleSeatClick = (seatid: string, status: string) => {
    if (status === "Booked" || status === "Reserved") return;

    setSelectedSeats((prevSelectedSeats) => {
      const updatedSelectedSeats = new Set(prevSelectedSeats);

      if (updatedSelectedSeats.has(seatid)) {
        updatedSelectedSeats.delete(seatid);
      } else {
        if (updatedSelectedSeats.size >= 10) {
          toast.error("You can select a maximum of 10 seats.");
          return prevSelectedSeats;
        }
        updatedSelectedSeats.add(seatid);
      }
      return updatedSelectedSeats;
    });
  };

  const totalSeats = selectedSeats.size;
  const totalPriceUSD = (totalSeats * PRICE_PER_SEAT_USD).toFixed(2); // Total price in USD

  const handleNext = () => {
    if (selectedSeats.size === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    // Find selected seat details to pass to PaymentPage
    const selectedSeatDetails = seats.filter((seat) =>
      selectedSeats.has(seat.seatid)
    );

    // Navigate to payment page with selected seats, total price, and showtimeId
    navigate(`/payment`, {
      state: {
        selectedSeats: selectedSeatDetails, // Pass seat details with seat_number
        totalPriceUSD,
        showtimeId, // Pass showtimeId to the PaymentPage
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Select Your Seats
        </h1>
        <div className="relative mb-10">
          <div className="flex justify-center">
            <div className="bg-gray-900 text-white p-3 rounded-t-full w-full text-center border">
              SCREEN
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {Object.keys(
            seats.reduce((acc: { [key: string]: Seat[] }, seat) => {
              const row = seat.seat_number.match(/[A-Z]/)?.[0] || "Unknown";
              if (!acc[row]) acc[row] = [];
              acc[row].push(seat);
              return acc;
            }, {})
          ).map((rowKey) => (
            <div key={rowKey} className="flex items-center mb-4">
              <span className="w-10 text-center font-semibold text-gray-700 text-lg">
                {rowKey}
              </span>
              <div className="grid grid-cols-10 gap-2">
                {seats
                  .filter((seat) => seat.seat_number.startsWith(rowKey))
                  .sort(
                    (a, b) =>
                      parseInt(a.seat_number.replace(/[^\d]/g, ""), 10) -
                      parseInt(b.seat_number.replace(/[^\d]/g, ""), 10)
                  )
                  .map((seat) => (
                    <label
                      key={seat.seatid}
                      className={`flex items-center justify-center cursor-pointer w-10 h-10 border rounded-md ${
                        seat.status === "Booked" || seat.status === "Reserved"
                          ? "bg-gray-500 cursor-no-drop"
                          : selectedSeats.has(seat.seatid)
                          ? "bg-blue-600 text-white"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={
                          seat.status === "Booked" || seat.status === "Reserved"
                        }
                        checked={selectedSeats.has(seat.seatid)}
                        onChange={() =>
                          handleSeatClick(seat.seatid, seat.status)
                        }
                        className="sr-only"
                      />
                      <span className="text-center text-sm font-semibold">
                        {seat.seat_number}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Total Price</h2>
          <p className="text-2xl font-bold text-gray-700">${totalPriceUSD}</p>
        </div>

        <button
          onClick={handleNext}
          className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
