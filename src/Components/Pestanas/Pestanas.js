import "./Pestanas.css"
import { Link } from "react-router-dom";

function Pestanas(props) {
    return (
        <li><Link class="nav-link" to={props.ruta}>{props.tit}</Link></li>       
    )
}
export default Pestanas

