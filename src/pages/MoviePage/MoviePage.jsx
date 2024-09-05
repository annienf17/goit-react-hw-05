import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

function MoviePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmY0MTJhMzNhNTUyYjhkMzAzOGFkYTlmOWIzOWE0OCIsIm5iZiI6MTcyNTU0NzE4NC43OTUzMzgsInN1YiI6IjY1MGFmNjRkYWVkZTU5MWFiMjYwZWZmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FSZ-2PklulCMgZm5zzagTG6hgAnwmR-S659Vj6MzSz8",
          },
        }
      );
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
    }
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
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviePage;
