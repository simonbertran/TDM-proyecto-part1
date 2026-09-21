import React, { Component } from "react";
import MovieCard from "../../Components/MovieCard/MovieCard";
import Filtro from "../../Components/Filtro/Filtro";
import Header from '../../Components/Header/Header';


class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: " ",
            pagina: 1,
            backup: [],
            filtro: ""
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&language=en-US&page=${this.state.pagina}`)
            .then(response => response.json())
            .then(data => this.setState({ 
                datos: data.results,
                backup: data.results }))
            .catch(error => console.log(error))
    }


    cargarMas() {
        const siguiente = this.state.pagina + 1
        fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&language=en-US&page=${siguiente}`)
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
            datos: this.state.backup.filter((movie) => {                
                 return movie.name.toLowerCase().includes(textoAFiltrar.toLowerCase())}
                )
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
                            <MovieCard key={movie.id} Peli={movie} tipo="tv"/>)}
                    </section>
                }
                <button className="cargar-mas" onClick={() => this.cargarMas()}>Cargar más</button>
            </div>
        );
    }
}

export default Series