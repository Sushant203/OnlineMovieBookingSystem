import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Movie } from "../../types/Movie";
import Modal from "./TheatreModalBox"; // Import the Modal component

type Props = {
  movie: Movie;
  showModal: boolean; // Add showModal prop
};

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}hr ${minutes}min`;
};

const MovieCard = ({ movie, showModal }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (showModal) {
      setIsModalOpen(true); // Only open modal if showModal is true
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className="max-w-lg mx-auto mb-6">
        <Card
          onClick={handleCardClick}
          className="cursor-pointer rounded-none rounded-r-md rounded-bl-md min-w-56"
        >
          <CardContent className="p-0">
            <img
              src={`http://localhost:4000/${movie.poster}`}
              alt={movie.title}
              className="w-full min-h-72 max-h-72 object-cover rounded-br-xl rounded-tl-xl"
            />
          </CardContent>
        </Card>
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
          <p className="text-gray-600">{formatDuration(movie.duration)}</p>
        </div>
      </div>
      {showModal && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          movieId={movie.movieid}
        />
      )}
    </>
  );
};

export default MovieCard;
