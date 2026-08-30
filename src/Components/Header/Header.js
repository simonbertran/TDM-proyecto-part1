import "./Header.css";
import Pestanas from "../Pestanas/Pestanas";

let pestana=["HOME","Peliculas","Series","Favoritos","Registro","Log in"]

function Header(props) {
    return (

        <header class="header">

            <h1>UdeSA Movies</h1>

            <nav>

                <ul class="nav nav-tabs my-4">
                    {pestana.map((pest,idx)=><Pestanas tit={pest} key={idx}/>)}
                </ul>

            </nav>
        </header>
        
    )
}
export default Header;

