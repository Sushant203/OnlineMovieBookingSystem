import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Movie } from '@/types/Movie';
import Modal from './TheatreModalBox'; // Import the Modal component

type Props = {
  movie: Movie;
};

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}hr ${minutes}min`;
};

const MovieCard = ({ movie }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();

  const handleCardClick = () => {
    setIsModalOpen(true); // Open the modal when card is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
       <div className="max-w-lg mx-auto mb-6">
      <Card onClick={handleCardClick} className="cursor-pointer rounded-none rounded-r-md rounded-bl-md">
        <CardContent className="p-0">
          <img
            src={`http://localhost:4000/${movie.poster}`}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-br-xl rounded-tl-xl"
          />
        </CardContent>
      </Card>
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-600">{formatDuration(movie.duration)}</p>
      </div>
    </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        movieId={movie.movieid}
      />
    </>
  );
};

export default MovieCard;
