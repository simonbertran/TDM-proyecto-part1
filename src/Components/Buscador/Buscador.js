import "./Buscador.css"
import { useEffect,useState } from "react";
import { withRouter } from 'react-router-dom';

function Buscador(props){
  const [busqueda,setBusqueda] = useState("")

  function controlarCambios(event){
    setBusqueda(event.target.value)
  }

  function evitarSubmit(event){
     event.preventDefault();
     if (busqueda !== '') {
      props.history.push('/searchresults/movie/' + busqueda);
    }
  }
  
    return (
      <form onSubmit={(event) => evitarSubmit(event)}>
        <input
          type="text"
          placeholder="Buscar pelicula/serie..."
          onChange={(event) => controlarCambios(event)}
          value={busqueda}
        />
        <button type="submit">Buscar</button>
      </form>
    );
  }

export default withRouter(Buscador);