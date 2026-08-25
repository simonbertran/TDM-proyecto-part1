import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";



function MovieDetail() {
  const { id } = useParams(); // agarra el "id" que viene de la URL

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488`)
      .then((respuesta) => respuesta.json())
      .then((datos) => 
        setMovie(datos))
      ;
  }, [id]);

  if (movie == null) return <p>Cargando...</p>;

  return (
    <div className="movie-detail">

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <h1>{movie.title}</h1>

      <p>
        <strong>Calificación:</strong> {movie.vote_average}
      </p>

      <p>
        <strong>Fecha de estreno:</strong> {movie.release_date}
      </p>

      <p>
        <strong>Duración:</strong> {movie.runtime} minutos
      </p>

      <p>
        <strong>Sinopsis:</strong> {movie.overview}
      </p>

      <div>
        <strong>Géneros:</strong>

        {movie.genres.map((genero) => (
          <p key={genero.id}>
            {genero.name}
          </p>
        ))}
      </div>

    </div>
  );
}

export default MovieDetail;