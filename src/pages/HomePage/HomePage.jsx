import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
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

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
