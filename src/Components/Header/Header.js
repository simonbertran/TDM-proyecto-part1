import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Header.css";
import Pestanas from "../Pestanas/Pestanas";
import LogOut from "../LogOut/LogOut";

const cookies = new Cookies();

let pestana = [
    { tit: "HOME", ruta: "/" },
    { tit: "Populares", ruta: "/peliculas/popular" },
    { tit: "Cartelera", ruta: "/peliculas/now_playing" },
    { tit: "Favoritos", ruta: "/favoritos" },
    { tit: "Registro", ruta: "/registro" },
    { tit: "Log in", ruta: "/login" },


];

class Header extends Component {

    render() {

        let haySesion = cookies.get("user-auth-cookie");

        let pestanasVisibles = pestana.filter((item) => {

            if (item.tit === "Favoritos") {
                return haySesion;
            }

            if (item.tit === "Registro" || item.tit === "Log in") {
                return !haySesion;
            }

            return true;
        });

        return (
            <header className="header">

                <h1>UdeSA Movies</h1>

                <nav>
                    <ul className="nav nav-tabs my-4">

                        {pestanasVisibles.map((pest, idx) =>
                            <Pestanas
                                tit={pest.tit}
                                ruta={pest.ruta}
                                key={pest.tit + idx}
                            />
                        )}

                        {haySesion ? <LogOut />
                            :
                            null}

                    </ul>
                </nav>

            </header>
        );
    }
}

export default Header;