import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTheaterMasks } from 'react-icons/fa'; // Import theater icon from react-icons

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
};

type Theater = {
  theaterid: number;
  theater_name: string;
  theater_location: string;
};

const TheatreModalBox: React.FC<ModalProps> = ({ isOpen, onClose, movieId }) => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:4000/theater')
        .then(response => setTheaters(response.data))
        .catch(error => console.error('Error fetching theater data:', error));
    }
  }, [isOpen]);

  const handleTheaterClick = (theaterId: number) => {
    navigate(`/movie/${movieId}/theater/${theaterId}`); // Navigate to the movie details page
  };

  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <FaTheaterMasks className="w-6 h-6" />
        </button>
        <div className="flex items-center mb-4">
          <FaTheaterMasks className="text-blue-500 text-3xl mr-3" />
          <h2 className="text-xl font-semibold">Select a Theater</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {theaters.map(theater => (
            <li
              key={theater.theaterid}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100 flex items-center"
              onClick={() => handleTheaterClick(theater.theaterid)}
            >
              <FaTheaterMasks className="text-gray-500 mr-3" />
              <div>
                <p className="font-semibold">{theater.theater_name}</p>
                <p className="text-sm text-gray-600">{theater.theater_location}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TheatreModalBox;
