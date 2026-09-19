import React, { Component } from "react";
import MovieCard from "../../Components/MovieCard/MovieCard";
import Filtro from "../../Components/Filtro/Filtro";
import Header from '../../Components/Header/Header';
import "./Peliculas.css";

class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: " ",
            pagina: 1,
            backup: [],
            tipo: props.match.params.tipo,
            filtro: ""
        }
    }

    componentDidMount() {
        const tipo = this.props.match.params.tipo
        fetch(`https://api.themoviedb.org/3/movie/${tipo}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&page=${this.state.pagina}`)
            .then(response => response.json())
            .then(data => this.setState({ 
                datos: data.results,
                backup: data.results }))
            .catch(error => console.log(error))
    }

    componentDidUpdate() {
        const tipo = this.props.match.params.tipo
        if (tipo !== this.state.tipo) {
            this.setState({ tipo: tipo, datos: " ", pagina: 1 })
            fetch(`https://api.themoviedb.org/3/movie/${tipo}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&page=1`)
                .then(response => response.json())
                .then(data => this.setState(
                    { backup: data.results },
                    () => this.filtrarPeliculas(this.state.filtro)
                ))
                .catch(error => console.log(error))
        }
    }

    cargarMas() {
        const tipo = this.props.match.params.tipo
        const siguiente = this.state.pagina + 1
        fetch(`https://api.themoviedb.org/3/movie/${tipo}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&page=${siguiente}`)
            .then(response => response.json())
            .then(data => this.setState({
                backup: this.state.backup.concat(data.results),
                pagina: siguiente
            }, 
            () => this.filtrarPeliculas(this.state.filtro)
        ))
            .catch(error => console.log(error))
    }
    
    filtrarPeliculas(textoAFiltrar) {
        this.setState({
            filtro: textoAFiltrar,
            datos: this.state.backup.filter((movie) => movie.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
        })
    }

    render() {
        return (
            <div>
                 <Header />
                <Filtro filtrar={(texto) => this.filtrarPeliculas(texto)} />

                {this.state.datos === " " ?
                    <h3>Cargando...</h3> :
                    <section className="Section-data">
                        {this.state.datos.map((movie) =>
                            <MovieCard key={movie.id} Peli={movie} />)}
                    </section>
                }
                <button className="cargar-mas" onClick={() => this.cargarMas()}>Cargar más</button>
            </div>
        );
    }
}

export default Peliculas