import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Define the state structure for the ticket page
type TicketState = {
  showtimeId: string;
  userId: string;
  seatNumbers: string[]; // Updated to seatNumbers
  bookingId: string;
  totalPriceUSD: string;
};

// Define types for the user and showtime data
type User = {
  fullname: string;
  email: string;
  phoneno: string;
  dateofbirth: string;
};

type Showtime = {
  show_time: string;
  show_date: string;
  title: string;
  duration: string;
  category_name: string;
  theater_name: string;
  theater_location: string;
};

export default function TicketPage() {
  const location = useLocation();
  const { showtimeId, userId, seatNumbers, bookingId, totalPriceUSD } =
    location.state as TicketState;

  const [user, setUser] = useState<User | null>(null);
  const [showtime, setShowtime] = useState<Showtime | null>(null);

  // Function to calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Fetch user data using axios
  useEffect(() => {
    axios
      .get(`http://localhost:4000/register/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  // Fetch showtime data using axios
  useEffect(() => {
    axios
      .get(`http://localhost:4000/showtime/${showtimeId}`)
      .then((response) => {
        // Check if showtime is an array, and set the first element if true
        const showtimeData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setShowtime(showtimeData);
      })
      .catch((error) => console.error("Error fetching showtime data:", error));
  }, [showtimeId]);

  // Function to download the ticket as PDF
  const downloadTicketAsPDF = () => {
    const ticketElement = document.getElementById("ticket");
    if (!ticketElement) return;

    html2canvas(ticketElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("movie_ticket.pdf");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg"
        id="ticket"
        style={{ border: "3px solid #333", padding: "20px", maxWidth: "600px" }}
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Movie Ticket
        </h1>

        {/* Movie Ticket Layout */}
        <div
          className="ticket-container text-center p-4"
          style={{ border: "2px dashed #333" }}
        >
          <div className="ticket-header mb-6 text-lg font-semibold">
            {/* <p>Ticket No: {bookingId}</p> */}
            <p>Theater: 02 / Seat(s): {seatNumbers.join(", ")}</p>
          </div>
          <h1>Total Price : ${totalPriceUSD}</h1>
          {showtime && (
            <div className="ticket-details mb-6">
              <h2 className="text-xl font-bold mb-2">{showtime.title}</h2>
              <p>Date: {new Date(showtime.show_date).toLocaleDateString()}</p>
              <p>Time: {showtime.show_time}</p>
              <p>Category: {showtime.category_name}</p>
              <p>Duration: {showtime.duration}</p>
              <p>
                Theater: {showtime.theater_name}, {showtime.theater_location}
              </p>
            </div>
          )}

          {user && (
            <div className="ticket-user-info">
              <p>Name: {user.fullname}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneno}</p>
              <p>Age: {calculateAge(user.dateofbirth)} years</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            className="w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={downloadTicketAsPDF}
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
