import React from 'react';
import { useParams } from 'react-router-dom';

const movieDetails = {
  1: { id: 1, title: 'Movie 1', description: 'Description for Movie 1', poster: '/path/to/poster1.jpg' },
  2: { id: 2, title: 'Movie 2', description: 'Description for Movie 2', poster: '/path/to/poster2.jpg' },
  // Add more movie details as needed
};

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movieDetails[id];

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={movie.title} />
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetail;
