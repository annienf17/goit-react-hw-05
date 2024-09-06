import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      setError(null);
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
        setError(err.message);
      } finally {
        setLoading(false);
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
          <div key={member.cast_id}>
            <img
              className={css.imgage_size}
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/200x300?text=No+Image";
              }}
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
