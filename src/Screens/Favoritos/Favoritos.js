import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Favoritos.css";

const cookies = new Cookies();

class Favoritos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peliculas: [],
            series: []
        };
    }

    componentDidMount() {
        let peliculasFavoritas =
            JSON.parse(localStorage.getItem("peliculasFavoritas")) || [];

        let seriesFavoritas =
            JSON.parse(localStorage.getItem("seriesFavoritas")) || [];

        this.setState({
            peliculas: peliculasFavoritas,
            series: seriesFavoritas
        });
        console.log(localStorage.getItem("peliculasFavoritas"));
    }

    eliminarPelicula(id) {
        let peliculasActualizadas = this.state.peliculas.filter(
            pelicula => pelicula.id !== id
        );

        this.setState({
            peliculas: peliculasActualizadas
        });

        localStorage.setItem(
            "peliculasFavoritas",
            JSON.stringify(peliculasActualizadas)
        );
    }

    eliminarSerie(id) {
        let seriesActualizadas = this.state.series.filter(
            serie => serie.id !== id
        );

        this.setState({
            series: seriesActualizadas
        });

        localStorage.setItem(
            "seriesFavoritas",
            JSON.stringify(seriesActualizadas)
        );
    }

    render() {

        let haySesion = cookies.get("user-auth-cookie");

        if (!haySesion) {
            return <Redirect to="/login" />;
        }

        return (
            <main className="favoritos">

                <h1>Mis Favoritos</h1>

                <section>
                    <h2>Películas favoritas</h2>

                    {this.state.peliculas.length === 0 ?
                        <p>No hay películas favoritas.</p>
                        :
                        this.state.peliculas.map((pelicula) => (
                            <article key={pelicula.id}>

                                <h3>{pelicula.title}</h3>

                                <Link to={`/detalle/${pelicula.id}`}>
                                    Ver detalle
                                </Link>

                                <button
                                    onClick={() =>
                                        this.eliminarPelicula(pelicula.id)
                                    }
                                >
                                    Eliminar de favoritos
                                </button>

                            </article>
                        ))
                    }

                </section>

                <section>
                    <h2>Series favoritas</h2>

                    {this.state.series.length === 0 ?
                        <p>No hay series favoritas.</p>
                        :
                        this.state.series.map((serie) => (
                            <article key={serie.id}>

                                <h3>{serie.name}</h3>

                                <Link to={`/serie/${serie.id}`}>
                                    Ver detalle
                                </Link>

                                <button
                                    onClick={() =>
                                        this.eliminarSerie(serie.id)
                                    }
                                >
                                    Eliminar de favoritos
                                </button>

                            </article>
                        ))
                    }

                </section>

            </main>
        );
    }
}

export default Favoritos;