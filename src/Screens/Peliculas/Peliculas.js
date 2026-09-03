import React, { Component } from "react";
import MovieCard from "../../Components/MovieCard/MovieCard";
import "./Peliculas.css";

class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: " ",
            pagina: 1
        }
    }

    componentDidMount() {
        const tipo = this.props.match.params.tipo
        fetch(`https://api.themoviedb.org/3/movie/${tipo}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&page=${this.state.pagina}`)
            .then(response => response.json())
            .then(data => this.setState({ datos: data.results }))
            .catch(error => console.log(error))
    }

    cargarMas() {
        const tipo = this.props.match.params.tipo
        const siguiente = this.state.pagina + 1
        fetch(`https://api.themoviedb.org/3/movie/${tipo}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&page=${siguiente}`)
            .then(response => response.json())
            .then(data => this.setState({
                datos: this.state.datos.concat(data.results),
                pagina: siguiente
            }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                {this.state.datos === " " ?
                    <h3>Cargando...</h3> :
                    <section className="Section-data">
                        {this.state.datos.map((movie) =>
                            <MovieCard key={movie.id} movie={movie} />)}
                    </section>
                }
                <button className="cargar-mas" onClick={() => this.cargarMas()}>Cargar más</button>
            </div>
        );
    }
}

export default Peliculas