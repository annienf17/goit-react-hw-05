import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import useLoadingError from "../../hooks/useLoadingError";

function MoviePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searched, setSearched] = useState(false);
  const {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    clearError,
  } = useLoadingError();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      fetchMovies(queryParam);
    }
  }, [searchParams]);

  const fetchMovies = async (searchQuery) => {
    startLoading();
    clearError();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US`,
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
        setErrorState("Network error: Please check your internet connection.");
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    setSearchParams({ query });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        searched && !loading && <p>No movies found.</p>
      )}
    </div>
  );
}

export default MoviePage;
