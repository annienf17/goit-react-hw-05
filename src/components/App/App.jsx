import { useEffect, useState } from "react";
import axios from "axios";
import css from "./App.module.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/configuration",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmY0MTJhMzNhNTUyYjhkMzAzOGFkYTlmOWIzOWE0OCIsIm5iZiI6MTcyNTQ3NjAxNy41OTE1ODIsInN1YiI6IjY1MGFmNjRkYWVkZTU5MWFiMjYwZWZmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qVQ1HMz4sng209RtHKKDDWadxNRnMDhRN8lsOfcRoc4",
            },
          }
        );
        setConfig(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmY0MTJhMzNhNTUyYjhkMzAzOGFkYTlmOWIzOWE0OCIsIm5iZiI6MTcyNTQ3NjAxNy41OTE1ODIsInN1YiI6IjY1MGFmNjRkYWVkZTU5MWFiMjYwZWZmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qVQ1HMz4sng209RtHKKDDWadxNRnMDhRN8lsOfcRoc4",
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchConfig();
    fetchMovies();
  }, []);

  const getImageUrl = (path) => {
    if (!config) return "";
    const baseUrl = config.images.secure_base_url;
    const size = config.images.poster_sizes[3]; // w500 size
    return `${baseUrl}${size}${path}`;
  };

  return (
    <>
      <div className={css.body}>
        <h1>Movie Library</h1>
        <div className={css.movies}>
          {movies.map((movie) => (
            <div key={movie.id} className={css.movie}>
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className={css.poster}
              />
              <h2>{movie.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
