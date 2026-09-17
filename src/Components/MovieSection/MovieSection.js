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

                        </div>
                        {this.state.datosPopu.filter((Peli,idx)=>idx<4).map((Peli) =>
                            <MovieCard key={Peli.id} Peli={Peli} />)}
                    </section>
                }

                {this.state.datosPlay === " " ?
                    <h3>Cargando...</h3> :
                    <section class='Section-data'>
                        <div className="titulo-seccion">
                            <h2>Películas en cartelera</h2>
                        </div>
                        {this.state.datosPlay.filter((Peli,idx)=>idx<4).map((Peli) =>
                            <MovieCard key={Peli.id} Peli={Peli} />)}
                    </section>
                }
            </div>
        );
    };
}
export default MovieSec

