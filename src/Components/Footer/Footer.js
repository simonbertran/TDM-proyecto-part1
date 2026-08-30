import "./Footer.css";

let alumnos = ["Micaela Ruiz", "Mirko Bibulich", "Simon Bertran"]

function Footer(props) {
    return (

        <footer >
             {alumnos.map((int)=><p>{int} | </p>)}
        </footer>

    )
}
export default Footer;

