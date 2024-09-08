import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import useLoadingError from "../../hooks/useLoadingError";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    clearError,
  } = useLoadingError();

  useEffect(() => {
    const fetchMovies = async () => {
      startLoading();
      clearError();
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        if (!err.response) {
          setErrorState(
            "Network error: Please check your internet connection."
          );
        } else if (err.response.status >= 500) {
          setErrorState("Server error: Please try again later.");
        } else if (err.response.status === 404) {
          setErrorState("Error: Movies not found.");
        } else {
          setErrorState(`Error: ${err.message}`);
        }
      } finally {
        stopLoading();
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Trending today</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No trending movies found.</p>
      )}
    </div>
  );
}

export default HomePage;
