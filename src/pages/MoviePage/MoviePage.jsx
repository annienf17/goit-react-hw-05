import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

function MoviePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // Stan dla programu ładującego
  const [error, setError] = useState(null); // Stan dla błędów
  const [searchParams, setSearchParams] = useSearchParams();
  const [searched, setSearched] = useState(false); // Stan dla śledzenia, czy wyszukiwanie zostało wykonane

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      fetchMovies(queryParam);
    }
  }, [searchParams]);

  const fetchMovies = async (searchQuery) => {
    setLoading(true);
    setError(null);
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true); // Ustawienie stanu na true po kliknięciu przycisku wyszukiwania
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
        searched && !loading && <p>No movies found.</p> // Wyświetlanie komunikatu tylko po kliknięciu przycisku wyszukiwania
      )}
    </div>
  );
}

export default MoviePage;
