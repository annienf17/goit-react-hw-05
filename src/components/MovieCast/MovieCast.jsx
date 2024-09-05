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
      <h2>Cast Information</h2>
      <ul>
        {cast.map((member) => (
          <li key={member.cast_id}>
            {member.name} as {member.character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
