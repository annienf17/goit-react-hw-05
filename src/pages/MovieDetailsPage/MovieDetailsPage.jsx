import { useEffect, useState, useRef } from "react";
import {
  Routes,
  Route,
  NavLink,
  useParams,
  useMatch,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const match = useMatch("/movies/:movieId/*");
  const navigate = useNavigate();
  const location = useLocation();
  const backLocationRef = useRef(location.state?.from || "/movies");
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovieDetails(response.data);
      } catch (err) {
        if (!err.response) {
          // Network error
          setError("Network error: Please check your internet connection.");
        } else if (err.response.status >= 500) {
          // Server error
          setError("Server error: Please try again later.");
        } else if (err.response.status === 404) {
          // Not found
          setError("Error: Movie details not found.");
        } else {
          // Other errors
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      <button onClick={() => navigate(backLocationRef.current)}>
        ← Go Back
      </button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {movieDetails && (
        <div className={css.movie_details}>
          <div>
            <img
              className={css.movie_image}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <div className={css.movie_info}>
            <h2>
              {movieDetails.title} (
              {new Date(movieDetails.release_date).getFullYear()})
            </h2>
            <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h3>Genres</h3>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}
      <div className={css.additional_info}>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink
              to={`${match.pathnameBase}/cast`}
              state={{ from: location }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${match.pathnameBase}/reviews`}
              state={{ from: location }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <hr />
      <Outlet />
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}

export default MovieDetailsPage;
