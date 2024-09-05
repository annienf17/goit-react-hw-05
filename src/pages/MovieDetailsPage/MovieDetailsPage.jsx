import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const match = useMatch("/movies/:movieId/*");
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
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
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      <button onClick={() => navigate(-1)}>← Go Back</button>
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
            <Link to={`${match.pathnameBase}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${match.pathnameBase}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>
      <hr />
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}

export default MovieDetailsPage;
