import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
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
        console.error(err);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((member) => (
          <div key={member.cast_id}>
            <img
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
