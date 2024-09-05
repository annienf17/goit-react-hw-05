import css from "./App.module.css";

function App() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmY0MTJhMzNhNTUyYjhkMzAzOGFkYTlmOWIzOWE0OCIsIm5iZiI6MTcyNTQ3NjAxNy41OTE1ODIsInN1YiI6IjY1MGFmNjRkYWVkZTU5MWFiMjYwZWZmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qVQ1HMz4sng209RtHKKDDWadxNRnMDhRN8lsOfcRoc4",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  return (
    <>
      <div className={css.body}>
        <h1>Movie Library</h1>
      </div>
    </>
  );
}

export default App;
