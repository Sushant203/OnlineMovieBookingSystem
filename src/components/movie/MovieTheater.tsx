import { Movie } from "@/types/Movie";
import { ShowTime } from "@/types/ShowTime";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieTheater() {
  const { movieId, theaterId } = useParams<{
    movieId: string;
    theaterId: string;
  }>();
  const [moviedata, setMoviedata] = useState<Movie[]>([]);
  const [showtimeData, setShowTimeData] = useState<ShowTime[]>([]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/movie/${movieId}`
      );
      setMoviedata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShowTime = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/showtime/movie/${movieId}/theater/${theaterId}`
      );
      setShowTimeData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchShowTime();
  }, [movieId, theaterId]);

  return (
    <div className="container mx-auto p-4">
      {moviedata.map((movie, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 mx-4 max-w-full flex"
        >
          {/* Image Section */}
          <div className="w-1/3 flex-shrink-0">
            <img
              src={`http://localhost:4000/${movie.poster}`}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              {movie.categoryname}
            </h2>
            <p className="text-gray-800 mb-4">{movie.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Release Date:</strong>{" "}
              {new Date(movie.releasedate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Duration:</strong> {movie.duration} minutes
            </p>
          </div>
        </div>
      ))}

      {/* Showtime Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Showtimes</h2>
        {showtimeData.length > 0 ? (
          <div>
            {showtimeData.map((showtime, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow mb-4"
              >
                <p className="text-lg font-bold mb-2">
                  {new Date(showtime.show_date).toLocaleDateString()} -{" "}
                  {showtime.show_time}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Theater:</strong> {showtime.theater_name}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Movie:</strong> {showtime.movie_title}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No showtimes available for this movie and theater.
          </p>
        )}
      </div>
    </div>
  );
}
