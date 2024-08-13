import { useEffect, useState } from "react";
import axios from "axios";

type Seat = {
  seat_number: string;
  seatid: string;
  status: string; // Available, Reserved, or Selected
};

export default function SeatManagement() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const MAX_SEATS = 7; // Maximum number of seats allowed
  const PRICE_PER_SEAT = 300; // Price per seat

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get("http://localhost:4000/seat");
        setSeats(response.data);
      } catch (error) {
        console.error("Failed to fetch seats", error);
      }
    };

    fetchSeats();
  }, []);

  const handleSeatClick = (seatid: string, status: string) => {
    if (status === "Reserved") return; // Do nothing if seat is reserved

    setSelectedSeats((prevSelectedSeats) => {
      const updatedSelectedSeats = new Set(prevSelectedSeats);

      // If adding a new seat, check if the limit is reached
      if (
        !updatedSelectedSeats.has(seatid) &&
        updatedSelectedSeats.size >= MAX_SEATS
      ) {
        alert(`You can select a maximum of ${MAX_SEATS} seats.`);
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
            <div key={rowKey} className="flex items-center mb-6">
              <span className="w-12 text-center font-semibold text-gray-700 text-xl">
                {rowKey}
              </span>
              <div className="flex flex-wrap gap-3">
                {sortedRows[rowKey].map((seat) => (
                  <label
                    key={seat.seatid}
                    className={`flex items-center justify-center cursor-pointer w-16 h-16 border rounded-lg ${
                      seat.status === "Reserved"
                        ? "bg-gray-500 cursor-not-allowed"
                        : selectedSeats.has(seat.seatid)
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      disabled={seat.status === "Reserved"}
                      checked={selectedSeats.has(seat.seatid)}
                      onChange={() => handleSeatClick(seat.seatid, seat.status)}
                      className="sr-only"
                    />
                    <span className="text-center text-lg font-semibold">
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
      </div>
    </div>
  );
}
