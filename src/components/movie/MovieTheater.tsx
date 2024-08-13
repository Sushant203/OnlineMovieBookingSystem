import { Movie } from "@/types/Movie";
import { ShowTime } from "@/types/ShowTime";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieTheater() {
  const { movieId, theaterId } = useParams<{
    movieId: string;
    theaterId: string;
  }>();
  const navigate = useNavigate();
  const [moviedata, setMoviedata] = useState<Movie[]>([]);
  const [showtimeData, setShowTimeData] = useState<ShowTime[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShowtime, setSelectedShowtime] = useState<{
    date: string;
    showtimeId: string;
    time: string;
  } | null>(null);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/movie/${movieId}`
      );
      setMoviedata(response.data);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);

    if (date.getTime() === today.getTime()) {
      return "Today";
    } else if (date.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedShowtime(null);
  };

  const handleTimeSelection = (showtimeId: string, time: string) => {
    setSelectedShowtime({ date: selectedDate, showtimeId, time });
  };

  const handleProceed = () => {
    if (selectedShowtime?.showtimeId) {
      navigate(
        `/seat/movie/${movieId}/theater/${theaterId}/showtime/${selectedShowtime.showtimeId}`
      );
    } else {
      alert("Please select a showtime.");
    }
  };

  const groupedShowtimes = showtimeData.reduce((acc, showtime) => {
    const date = new Date(showtime.show_date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(showtime);
    return acc;
  }, {} as { [key: string]: ShowTime[] });

  // Filter out dates before today and times before the current time
  const today = new Date().setHours(0, 0, 0, 0);

  const filteredGroupedShowtimes = Object.keys(groupedShowtimes)
    .filter((date) => new Date(date).getTime() >= today)
    .reduce((obj, key) => {
      obj[key] = groupedShowtimes[key];
      return obj;
    }, {} as { [key: string]: ShowTime[] });

  return (
    <div className="container mx-auto p-4">
      {moviedata.map((movie, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 mx-4 max-w-full flex flex-col md:flex-row"
        >
          <div className="w-full md:w-1/3">
            <img
              src={`http://localhost:4000/${movie.poster}`}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="w-full p-6">
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

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Showtimes</h2>
              {Object.keys(filteredGroupedShowtimes).length > 0 ? (
                <div>
                  <div className="flex overflow-x-auto mb-4">
                    {Object.keys(filteredGroupedShowtimes).map(
                      (date, index) => (
                        <button
                          key={index}
                          className={`mr-4 px-4 py-2 rounded-full whitespace-nowrap ${
                            selectedDate === date
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                          onClick={() => handleDateChange(date)}
                        >
                          {formatDate(date)}
                        </button>
                      )
                    )}
                  </div>

                  <div>
                    {filteredGroupedShowtimes[selectedDate]?.map((showtime) => {
                      const isToday =
                        new Date(selectedDate).toDateString() ===
                        new Date().toDateString();
                      const showTimeDate = new Date(
                        `${showtime.show_date} ${showtime.show_time}`
                      );
                      const isPast = isToday && showTimeDate < new Date();

                      return (
                        <button
                          key={showtime.showtimeid}
                          className={`text-gray-700 mb-1 mr-4 px-4 py-2 rounded-full ${
                            selectedShowtime?.date === selectedDate &&
                            selectedShowtime?.time === showtime.show_time
                              ? "bg-blue-500 text-white"
                              : "bg-white border border-gray-300"
                          } ${isPast ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() =>
                            !isPast &&
                            handleTimeSelection(
                              showtime.showtimeid,
                              showtime.show_time
                            )
                          }
                          disabled={isPast}
                        >
                          {showtime.show_time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  No showtimes available for this movie and theater.
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleProceed}
                className="bg-green-500 text-white px-4 py-2 rounded-full"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
