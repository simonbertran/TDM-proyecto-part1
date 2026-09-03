import "./MovieSection.css"
import MovieCard from "../MovieCard/MovieCard"
import React, { Component } from "react";
import { Link } from "react-router-dom";


class MovieSec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datosPopu: " ",
            datosPlay: " ",
        }
    }

    componentDidMount() {
        fetch(" https://api.themoviedb.org/3/movie/popular?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488")
            .then(response => response.json())
            .then(data => this.setState({ datosPopu: data.results }))
            .catch(error => console.log(error))

        fetch(" https://api.themoviedb.org/3/movie/now_playing?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488")
            .then(response => response.json())
            .then(data => this.setState({ datosPlay: data.results }))
            .catch(error => console.log(error))

    }

    render() {
        return (
            <div>
                {this.state.datosPopu === " " ?
                    <h3>Cargando...</h3> :
                    <section class='Section-data'>
                        <div className="titulo-seccion">
                            <h2>Películas populares</h2>
                            <Link className="ver-todas" to="/peliculas/popular">Ver todas</Link> 

                        </div>
                        {this.state.datosPopu.map((movie) =>
                            <MovieCard key={movie.id} movie={movie} />)}
                    </section>
                }

                {this.state.datosPlay === " " ?
                    <h3>Cargando...</h3> :
                    <section class='Section-data'>
                        <div className="titulo-seccion">
                            <h2>Películas en cartelera</h2>
                            <Link className="ver-todas" to="/peliculas/now_playing">Ver todas</Link>
                        </div>
                        {this.state.datosPlay.map((movie) =>
                            <MovieCard key={movie.id} movie={movie} />)}
                    </section>
                }
            </div>
        );
    };
}
export default MovieSec

