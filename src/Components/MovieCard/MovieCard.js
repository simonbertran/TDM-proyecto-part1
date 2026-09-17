import "./MovieCard.css"
import React, { Component } from "react";
import { Link } from "react-router-dom";
import BotonFav from "../BotonFav/BotonFav";


class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estaOculto: true,
            estaSelect: false
        }
    }

    verMas() {
        this.setState({
            estaOculto: false
        });
    }
    verMenos() {
        this.setState({
            estaOculto: true
        });
    }

    select() {
        this.setState({
            estaSelect: !this.state.estaSelect
        });
    }

    favorito() {
        let haySesion = cookies.get("user-auth-cookie");

        // Si no está logueado lo manda al login
        if (!haySesion) {
            this.props.history.push("/login");
            return;
        }

        let peliculasFavoritas =
            JSON.parse(localStorage.getItem("peliculasFavoritas")) || [];

        // Si ya está en favoritos, la elimina
        if (this.state.esFavorita) {

            let peliculasActualizadas = peliculasFavoritas.filter(
                pelicula => pelicula.id !== this.props.movie.id
            );

            localStorage.setItem(
                "peliculasFavoritas",
                JSON.stringify(peliculasActualizadas)
            );

            this.setState({
                esFavorita: false
            });

        } else {

            // Si no está en favoritos, la agrega
            peliculasFavoritas.push(this.props.Peli);

            localStorage.setItem(
                "peliculasFavoritas",
                JSON.stringify(peliculasFavoritas)
            );

            this.setState({
                esFavorita: true
            });
        }
    }

    render() {

        const posterUrl =
            `https://image.tmdb.org/t/p/w500${this.props.Peli.poster_path}`;

        return (

            <article
                className={
                    this.state.estaSelect
                        ? "character-card active"
                        : "character-card"
                }
            >

                <button
                    className="favorite-button"
                    onClick={() => this.favorito()}
                    type="button"
                >
                    {this.state.esFavorita ? "♥" : "♡"}
                </button>

                <img
                    src={posterUrl}
                    alt={this.props.Peli.title}
                />

                <h4>{this.props.Peli.title}</h4>

                <Link className="more" to={`/detalle/${this.props.Peli.id}`}>
                    Ir al detalle
                </Link>

                {this.state.estaOculto?
                    <>
                        <button className='more' onClick={() => this.verMas()}> Ver Descripcion</button>
                    </>
                    :
                    <>
                        <p>Fecha de estreno: {this.props.movie.release_date}</p>
                        <p>Sinopsis: {this.props.movie.overview}</p>                        
                        <button className='more' onClick={() => this.verMenos()}> Ocultar Descripcion</button>
                        

                    </>
                }
            </article>
        );
    };
}
export default MovieCard

