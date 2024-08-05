import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Movie } from "../../types/Movie";

const NowShowing: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/movie/now-showing`
        ); // Replace with your actual API endpoint
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 p-8">
      {/* <h2 className="text-3xl font-bold text-center mb-8">Now Showing</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(movies as Movie[]).map((movie) => (
          <MovieCard key={movie.movieid} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default NowShowing;
