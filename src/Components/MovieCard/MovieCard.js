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
        })
    }

    render() {
        const posterUrl = `https://image.tmdb.org/t/p/w500${this.props.Peli.poster_path}`;
        const titulo = this.props.tipo === "tv" ? this.props.Peli.name : this.props.Peli.title;
        const fecha = this.props.tipo === "tv" ? this.props.Peli.first_air_date : this.props.Peli.release_date;
        const tipo = this.props.tipo === "tv" ? "tv" : "movie";
        return (
            <article className={this.state.estaSelect ? "character-card active" : "character-card"} onDoubleClick={() => this.select()}>
                <img src={posterUrl} alt={titulo} />
                <h4>{titulo}</h4>
                <Link className="more" to={`/detalle/${tipo}/${this.props.Peli.id}`}>Ir al detalle</Link>

                <BotonFav id={this.props.Peli.id} tipo={tipo} />

                {this.state.estaOculto?
                    <>
                        <button className='more' onClick={() => this.verMas()}> Ver Descripcion</button>
                    </>
                    :
                    <>
                        <p>Fecha de estreno: {fecha}</p>
                        <p>Sinopsis: {this.props.Peli.overview}</p>                        
                        <button className='more' onClick={() => this.verMenos()}> Ocultar Descripcion</button>
                        

                    </>
                }
            </article>
        );
    };
}
export default MovieCard

