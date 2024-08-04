// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Movie } from '@/types/Movie';

// interface MovieDetailProps {
//   movieDetails: { [key: number]: Movie };
// }

// const MovieDetail: React.FC<MovieDetailProps> = ({ movieDetails }) => {
//   const { movieid } = useParams<{ movieid: number }>();
//   const movie = movieDetails[movieid];

//   if (!movie) {
//     return <p>Movie not found</p>;
//   }

//   return (
//     <div>
//       <h1>{movie.title}</h1>
//       <img src={movie.poster} alt={movie.title} />
//       <p>{movie.description}</p>
//     </div>
//   );
// };

// export default MovieDetail;
