import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Movie = {
  movieid: number;
  title: string;
  poster: string;
  description: string;
  duration: number;
  categoryname: string;
  releasedate: string;
};

export default function SingleMovie() {
  const { movieId } = useParams<{ movieId: string }>(); // Extract movieId from params
  const [movie, setMovie] = useState<Movie | null>(null); // State for a single movie
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/movie/${movieId}`
      );
      setMovie(response.data[0]);
      console.log(response.data, "sfgsdgvfdgbteg");
    } catch (error) {
      setError("Failed to fetch movie details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);

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

  if (!movie) {
    return <div>No movie found</div>;
  }

  return (
    <main className="p-8">
      <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={`http://localhost:4000/${movie.poster}`}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-700 mb-4">{movie.description}</p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {movie.categoryname}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Duration: {Math.floor(movie.duration / 60)}h {movie.duration % 60}
            min
          </p>
          <p className="text-sm text-gray-500">
            Release Date: {new Date(movie.releasedate).toLocaleDateString()}
          </p>
        </div>
      </section>
    </main>
  );
}
