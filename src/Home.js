import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  // const [movies, setMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setMovies(datos.results));
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488`)
      .then((respuesta) => respuesta.json())
      .then((datos) => setNowPlaying(datos.results));
  }, []);


  return (
    <div>
      <h1>Películas populares</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <h1>Películas en cartelera</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {nowPlaying.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
