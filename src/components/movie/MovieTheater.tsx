import { Movie } from "@/types/Movie";
import { ShowTime } from "@/types/ShowTime";
import { ITheater } from "@/types/Theater";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  Theater: ITheater;
  Movie: Movie;
};

export default function MovieTheater({}: Props) {
  const { movieId } = useParams<{ movieId: string }>();
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
      const response = await axios.get(`http://localhost:4000/showtime`);
      setShowTimeData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchShowTime();
  }, [movieId]);

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
    </div>
  );
}
