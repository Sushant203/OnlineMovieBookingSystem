import React from 'react';
import MovieCard from './MovieCard';

const movies = [
  { id: 1, title: 'Movie 1', poster: '/movie logo.png' },
  { id: 2, title: 'Movie 2', poster: '/movie logo.png' },
  // Add more movies as needed
];

const NowShowing = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
};

export default NowShowing;
