import "./Header.css";
import Pestanas from "../Pestanas/Pestanas";

let pestana = [
    { tit: "HOME", ruta: "/" },
    { tit: "Populares", ruta: "/peliculas/popular" },
    { tit: "Cartelera", ruta: "/peliculas/now-playing" },
    { tit: "Series", ruta: "/series" },
    { tit: "Favoritos", ruta: "/favoritos" },
    { tit: "Registro", ruta: "/registro" },
    { tit: "Log in", ruta: "/login" }
]

function Header() {
    return (

        <header class="header">

            <h1>UdeSA Movies</h1>

            <nav>

                <ul class="nav nav-tabs my-4">
                    {pestana.map((pest,idx)=><Pestanas tit={pest.tit} ruta={pest.ruta} key={idx}/>)}
                </ul>

            </nav>
        </header>
        
    )
}
export default Header;

