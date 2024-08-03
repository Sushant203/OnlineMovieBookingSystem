import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card onClick={handleCardClick} className="cursor-pointer">
      <CardContent className="flex items-center justify-center p-6">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
