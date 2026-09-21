import "./Boton.css";
import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class BotonFav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fav: false
        }
    }

    componentDidMount() {
        let clave = this.props.tipo === "tv" ? "favoritosSeries" : "favoritosPeliculas"
        let storageString = localStorage.getItem(clave)
        let storage = JSON.parse(storageString)
        if (storage !== null) {
            let existe = storage.includes(this.props.id)
            this.setState({ fav: existe })
        }
    }

    agregarFav() {
    let id = this.props.id
    let clave = this.props.tipo === "tv" ? "favoritosSeries" : "favoritosPeliculas"
    let existeFav = localStorage.getItem(clave)
    if (existeFav == null) {
        let favoritos = [id]
        let storageString = JSON.stringify(favoritos)
        localStorage.setItem(clave, storageString)
    } else {
        let storageString = localStorage.getItem(clave)
        let favsRecuperados = JSON.parse(storageString)
        favsRecuperados.push(id)
        let favsString = JSON.stringify(favsRecuperados)
        localStorage.setItem(clave, favsString)
    }
    this.setState({ fav: true })
}

    sacarFav() {
        let id = this.props.id
        let clave = this.props.tipo === "tv" ? "favoritosSeries" : "favoritosPeliculas"
        let storageRecuperado = localStorage.getItem(clave)
        let storage = JSON.parse(storageRecuperado)
        let storageFiltrado = storage.filter((idPelicula) => idPelicula !== id)
        let storageString = JSON.stringify(storageFiltrado)
        localStorage.setItem(clave, storageString)
        this.setState({ fav: false })
    }

    render() {
        let haySesion = cookies.get('user-auth-cookie');
        return (
            <React.Fragment>
                {haySesion != null ?
                    (this.state.fav == false ?
                        <button className='more' onClick={() => this.agregarFav()}>♡</button>
                        :
                        <button className='more' onClick={() => this.sacarFav()}>♥</button>
                    )
                    :
                    ''
                }
            </React.Fragment>
        );
    }
}

export default BotonFav