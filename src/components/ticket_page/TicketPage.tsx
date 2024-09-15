import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload, FaBarcode } from "react-icons/fa"; // FontAwesome download and barcode icons

// Define the state structure for the ticket page
type TicketState = {
  showtimeId: string;
  userId: string;
  seatNumbers: string[];
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
  categoryname: string;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative"
        id="ticket"
        style={{
          border: "2px solid #333",
          padding: "20px",
          maxWidth: "600px",
          position: "relative",
        }}
      >
        {/* Download Icon */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={downloadTicketAsPDF}
        >
          <FaDownload size={24} />
        </button>

        {/* Barcode Icon */}
        <div
          className="absolute top-4 left-4"
          style={{ width: "100px", height: "50px" }}
        >
          <FaBarcode size={32} />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Movie Ticket
        </h1>

        {/* Movie Ticket Layout */}
        <div
          className="ticket-container text-center p-6"
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            position: "relative",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-semibold text-gray-600">
              {/* <p className="mb-1">Booking ID: {bookingId}</p> */}
              <p>Seats: {seatNumbers.join(", ")}</p>
            </div>
            <div className="text-lg font-bold text-gray-800">
              ${totalPriceUSD}
            </div>
          </div>

          <div className="ticket-header mb-4 text-lg font-semibold">
            <p className="text-sm mb-1">Movie:</p>
            <h2 className="text-xl font-bold mb-2">{showtime?.title}</h2>
            <p>
              Date: {new Date(showtime?.show_date || "").toLocaleDateString()}
            </p>
            <p>Time: {showtime?.show_time || ""}</p>
            <p>Duration: {showtime?.duration}</p>
            <p>
              Theater: {showtime?.theater_name}, {showtime?.theater_location}
            </p>
          </div>

          {user && (
            <div className="ticket-user-info mt-6">
              <p className="font-semibold text-gray-700">
                Name: {user.fullname}
              </p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneno}</p>
              <p>Age: {calculateAge(user.dateofbirth)} years</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
