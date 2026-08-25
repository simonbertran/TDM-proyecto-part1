import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard(props) {

  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;

  return (
    <Link to={`/movie/${props.movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ width: "150px" }}>
        <img src={posterUrl} alt={props.movie.title} style={{ width: "100%", borderRadius: "6px" }} />
        <p>{props.movie.title}</p>
      </div>
    </Link>
  );
}

export default MovieCard;