import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useLoadingError from "../../hooks/useLoadingError";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    clearError,
  } = useLoadingError();

  useEffect(() => {
    const fetchReviews = async () => {
      startLoading();
      clearError();
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        setErrorState(err.message);
      } finally {
        stopLoading();
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && reviews.length === 0 && (
        <div>We do not have any reviews for this movie</div>
      )}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
