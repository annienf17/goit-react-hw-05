import { Link, useLocation } from "react-router-dom";

function MovieList({ movies }) {
  const location = useLocation(); // Użycie hooka useLocation

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }} // Dodanie właściwości state z wartością location
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
