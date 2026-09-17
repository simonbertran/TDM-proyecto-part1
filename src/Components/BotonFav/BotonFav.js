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
        let storageString = localStorage.getItem('favoritosPeliculas')
        let storage = JSON.parse(storageString)
        if (storage !== null) {
            let existe = storage.includes(this.props.id)
            this.setState({ fav: existe })
        }
    }

    agregarFav() {
        let id = this.props.id
        let existeFav = localStorage.getItem('favoritosPeliculas')
        if (existeFav == null) {
            let favoritos = [id]
            let storageString = JSON.stringify(favoritos)
            localStorage.setItem('favoritosPeliculas', storageString)
        } else {
            let storageString = localStorage.getItem('favoritosPeliculas')
            let favsRecuperados = JSON.parse(storageString)
            favsRecuperados.push(id)
            let favsString = JSON.stringify(favsRecuperados)
            localStorage.setItem('favoritosPeliculas', favsString)
        }
        this.setState({ fav: true })
    }

    sacarFav() {
        let id = this.props.id
        let storageRecuperado = localStorage.getItem('favoritosPeliculas')
        let storage = JSON.parse(storageRecuperado)
        let storageFiltrado = storage.filter((idPelicula) => idPelicula !== id)
        let storageString = JSON.stringify(storageFiltrado)
        localStorage.setItem('favoritosPeliculas', storageString)
        this.setState({ fav: false })
    }

    render() {
        let haySesion = cookies.get('user-auth-cookie');
        return (
            <React.Fragment>
                {haySesion != null ?
                    (this.state.fav == false ?
                        <button className='more' onClick={() => this.agregarFav()}>Agregar a favoritos</button>
                        :
                        <button className='more' onClick={() => this.sacarFav()}>Quitar de favoritos</button>
                    )
                    :
                    ''
                }
            </React.Fragment>
        );
    }
}

export default BotonFav