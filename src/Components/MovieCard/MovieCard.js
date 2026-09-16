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
        const posterUrl = `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`;
        return (
            <article className={this.state.estaSelect ? "character-card active" : "character-card"} onDoubleClick={() => this.select()}>
                <img src={posterUrl} alt={this.props.movie.title} />
                <h4>{this.props.movie.title}</h4>
                <Link className="more" to={`/detalle/${this.props.movie.id}`}>Ir al detalle</Link>

                <BotonFav id={this.props.movie.id} />

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

