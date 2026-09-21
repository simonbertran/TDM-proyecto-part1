import React, { Component } from "react";
import "./Detalle.css";
import BotonFav from "../../Components/BotonFav/BotonFav";
import Header from '../../Components/Header/Header';

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: " "
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const tipo = this.props.match.params.tipo
        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488`)
            .then(response => response.json())
            .then(data => this.setState({ pelicula: data}))
            .catch(error => console.log(error))
    }

    render() {
        const tipo = this.props.match.params.tipo;
        const titulo = tipo === "tv" ? this.state.pelicula.name : this.state.pelicula.title;
        const fecha = tipo === "tv" ? this.state.pelicula.first_air_date : this.state.pelicula.release_date;
        return (
            <div>
                 <Header />
                {this.state.pelicula === " " ?
                    <h3>Cargando...</h3> :
                    
                    <article className="detalle">

                            <img src={`https://image.tmdb.org/t/p/w500${this.state.pelicula.poster_path}`} alt={titulo} />
                            <div className="detalle-info">
                                <h2>{titulo}</h2>
                                <p>Calificación: {this.state.pelicula.vote_average}</p>
                                <p>Fecha de estreno: {fecha}</p>
                                {tipo === "movie" ? <p>Duración: {this.state.pelicula.runtime} minutos</p> : ""}
                                <p>Sinopsis: {this.state.pelicula.overview}</p>
                                <div className="generos">
                                    <p>Género:</p> {this.state.pelicula.genres.map((genero, idx) => <p key={idx}>{genero.name} |</p> )}
                                </div>
                                <BotonFav id={this.state.pelicula.id} tipo={tipo} />                            </div>
                    </article>
                }
            </div>
        );
    }
}

export default Detalle