import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Seat = {
  seat_number: string;
  seatid: string;
  status: string; // Available, Reserved, or Booked
};

export default function SeatManagement() {
  const { showtimeId } = useParams<{
    movieId: string;
    theaterId: string;
    showtimeId: string;
  }>();
  console.log(showtimeId, "showtimeId");

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const MAX_SEATS = 7; // Maximum number of seats allowed
  const PRICE_PER_SEAT = 300; // Price per seat

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/seat`);
        setSeats(response.data);
      } catch (error) {
        console.error("Failed to fetch seats", error);
      }
    };

    if (showtimeId) {
      fetchSeats();
    }
  }, [showtimeId]);

  const handleSeatClick = (seatid: string, status: string) => {
    if (status === "Booked" || status === "Reserved") return; // Do nothing if seat is booked or reserved

    setSelectedSeats((prevSelectedSeats) => {
      const updatedSelectedSeats = new Set(prevSelectedSeats);

      // If adding a new seat, check if the limit is reached
      if (
        !updatedSelectedSeats.has(seatid) &&
        updatedSelectedSeats.size >= MAX_SEATS
      ) {
        toast.error(`You can select a maximum of ${MAX_SEATS} seats.`);
        return prevSelectedSeats;
      }

      // Toggle the seat selection
      if (updatedSelectedSeats.has(seatid)) {
        updatedSelectedSeats.delete(seatid);
      } else {
        updatedSelectedSeats.add(seatid);
      }
      return updatedSelectedSeats;
    });
  };

  const handleBookNow = async () => {
    if (selectedSeats.size === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/booking", {
        user_id: 9, // Replace with actual user ID
        showtime_id: showtimeId, // Use the correct showtime ID
        seat_ids: Array.from(selectedSeats), // Array of selected seat IDs
      });

      if (response.status === 200) {
        toast.success("Booking successful!");
        setSelectedSeats(new Set()); // Optionally reset the selected seats
      } else {
        toast.error("Failed to book seats. Please try again.");
      }
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("An error occurred while booking. Please try again.");
    }
  };

  // Calculate total price
  const totalPrice = selectedSeats.size * PRICE_PER_SEAT;

  // Organize seats into rows based on seat_number and sort by numeric part
  const rows = seats.reduce((acc: { [key: string]: Seat[] }, seat) => {
    const row = seat.seat_number.match(/[A-Z]/)?.[0] || "Unknown";
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {});

  // Sort seats in each row by numeric part
  const sortedRows = Object.keys(rows).reduce(
    (acc: { [key: string]: Seat[] }, rowKey) => {
      acc[rowKey] = rows[rowKey].sort((a, b) => {
        const aNumber = parseInt(a.seat_number.replace(/[^\d]/g, ""), 10);
        const bNumber = parseInt(b.seat_number.replace(/[^\d]/g, ""), 10);
        return aNumber - bNumber;
      });
      return acc;
    },
    {}
  );

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
          {Object.keys(sortedRows).map((rowKey) => (
            <div key={rowKey} className="flex items-center mb-4">
              <span className="w-10 text-center font-semibold text-gray-700 text-lg">
                {rowKey}
              </span>
              <div className="grid grid-cols-10 gap-2">
                {sortedRows[rowKey].map((seat) => (
                  <label
                    key={seat.seatid}
                    className={`flex items-center justify-center cursor-pointer w-10 h-10 border rounded-md ${
                      seat.status === "Booked" || seat.status === "Reserved"
                        ? "bg-gray-500 cursor-not-allowed"
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
                      onChange={() => handleSeatClick(seat.seatid, seat.status)}
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
          <p className="text-2xl font-bold text-gray-700">{`Rs.${totalPrice}`}</p>
        </div>
        <button
          onClick={handleBookNow}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Book Now
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
