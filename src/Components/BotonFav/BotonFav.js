import "./Boton.css";
import { useEffect, useState } from "react";
import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function BotonFav(props) {
    const [fav, setFav] = useState(false);

    useEffect(() => {
        let clave = props.tipo === "tv" ? "favoritosSeries" : "favoritosPeliculas"
        let storageString = localStorage.getItem(clave)
        let storage = JSON.parse(storageString)
        if (storage !== null) {
            let existe = storage.includes(props.id)
            setFav(existe)
        }
    })

    function agregarFav() {
        let id = props.id
        let clave = props.tipo === "tv" ? "favoritosSeries" : "favoritosPeliculas"
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
        setFav(true)
    }

    function sacarFav(){
    let id = props.id
    let clave = props.tipo === "tv" ? "favoritosSeries" : "favoritosPeliculas"
    let storageRecuperado = localStorage.getItem(clave)
    let storage = JSON.parse(storageRecuperado)
    let storageFiltrado = storage.filter((idPelicula) => idPelicula !== id)
    let storageString = JSON.stringify(storageFiltrado)
    localStorage.setItem(clave, storageString)
    setFav(false)
    }

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


export default BotonFav