import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Define the state structure for the ticket page
type TicketState = {
  showtimeId: string;
  userId: string;
  seatIds: string[];
  bookingId: string;
};

export default function TicketPage() {
  const location = useLocation();
  const { showtimeId, userId, seatIds, bookingId } =
    location.state as TicketState;

  // Function to download the ticket as PDF
  const downloadTicketAsPDF = () => {
    const ticketElement = document.getElementById("ticket");
    if (!ticketElement) return;

    html2canvas(ticketElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      // Get the width and height of the canvas in pixels
      const imgWidth = 210; // A4 paper width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale the height according to the image aspect ratio

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("movie_ticket.pdf");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl"
        id="ticket"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Your Movie Ticket
        </h1>

        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Booking Details
          </h2>
          <p className="text-lg text-gray-700">Showtime ID: {showtimeId}</p>
          <p className="text-lg text-gray-700">User ID: {userId}</p>
          <p className="text-lg text-gray-700">Booking ID: {bookingId}</p>
          <p className="text-lg text-gray-700">Seats: {seatIds.join(", ")}</p>
        </div>

        <div className="mt-6">
          <button
            className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={downloadTicketAsPDF}
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
