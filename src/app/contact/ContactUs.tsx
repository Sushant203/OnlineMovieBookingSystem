import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Contact Us
        </h1>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <p className="text-lg text-gray-700">
              Main Office: Butwal , Near Buspark
            </p>
          </div>

          <div className="flex items-center">
            <FaPhone className="mr-2 text-gray-600" />
            <p className="text-lg text-gray-700">07100000</p>
          </div>

          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-600" />
            <p className="text-lg text-gray-700">support@moviebooking.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
