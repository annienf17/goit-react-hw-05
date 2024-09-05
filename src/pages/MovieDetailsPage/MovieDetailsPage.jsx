import { Routes, Route, Link, useParams, useMatch } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const match = useMatch("/movies/:movieId/*");

  return (
    <div>
      <h1>Movie Details for {movieId}</h1>
      <ul>
        <li>
          <Link to={`${match.pathnameBase}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`${match.pathnameBase}/reviews`}>Reviews</Link>
        </li>
      </ul>

      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}

export default MovieDetailsPage;
