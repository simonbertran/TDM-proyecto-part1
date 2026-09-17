import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from '../../Components/Header/Header';

const cookies = new Cookies();

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculas: ''
        }
    }

    componentDidMount() {
        let haySesion = cookies.get('user-auth-cookie')
        if (haySesion == null) {
            this.props.history.push('/login')
        } else {
            let storageString = localStorage.getItem('favoritosPeliculas')
            let storage = JSON.parse(storageString)
            let peliculasRecuperadas = []
            if (storage == null || storage.length === 0) {
                this.setState({ peliculas: [] })
            } else {
                storage.map((idPelicula) =>
                    fetch(`https://api.themoviedb.org/3/movie/${idPelicula}?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488`)
                        .then(response => response.json())
                        .then(data => {
                            peliculasRecuperadas.push(data)
                            this.setState({ peliculas: peliculasRecuperadas })
                        })
                        .catch(error => console.log(error))
                )
            }
        }
    }

    sacarFav(id) {
        let storageRecuperado = localStorage.getItem('favoritosPeliculas')
        let storage = JSON.parse(storageRecuperado)
        let storageFiltrado = storage.filter((idPelicula) => idPelicula !== id)
        let storageString = JSON.stringify(storageFiltrado)
        localStorage.setItem('favoritosPeliculas', storageString)
        this.setState({
            peliculas: this.state.peliculas.filter((pelicula) => pelicula.id !== id)
        })
    }

    render() {
        return (
            <div>
                 <Header />
                <h2>Películas favoritas</h2>
                {this.state.peliculas === '' ?
                    <h3>Cargando...</h3> :
                    <section className="Section-data">
                        {this.state.peliculas.map((pelicula) =>
                            <article className="character-card" key={pelicula.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                                <h4>{pelicula.title}</h4>
                                <Link className="more" to={`/detalle/${pelicula.id}`}>Ir al detalle</Link>
                                <button className="more" onClick={() => this.sacarFav(pelicula.id)}>Quitar de favoritos</button>
                            </article>
                        )}
                    </section>
                }
            </div>
        );
    }
}

export default Favoritos