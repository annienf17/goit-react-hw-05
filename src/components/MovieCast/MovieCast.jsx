import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";
import useLoadingError from "../../hooks/useLoadingError";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    clearError,
  } = useLoadingError();

  useEffect(() => {
    const fetchCast = async () => {
      startLoading();
      clearError();
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        if (!err.response) {
          setErrorState(
            "Network error: Please check your internet connection."
          );
        } else if (err.response.status >= 500) {
          setErrorState("Server error: Please try again later.");
        } else if (err.response.status === 404) {
          setErrorState("Error: Cast information not found.");
        } else {
          setErrorState(`Error: ${err.message}`);
        }
      } finally {
        stopLoading();
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && cast.length === 0 && (
        <div>No cast information available.</div>
      )}
      <ul>
        {cast.map((member) => (
          <div key={member.id}>
            <img
              className={css.imgage_size}
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={member.name}
              loading="lazy"
            />
            <li>
              <p>{member.name}</p>
              <p>Character: {member.character}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
