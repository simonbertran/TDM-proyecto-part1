import "./Filtro.css";
import {useState } from "react";
import React from "react";

function Filtro(props) {
    const [valorFiltro, setValorFiltro] = useState("")

    function evitarSubmit(event) {
        event.preventDefault()
    }
    function controlarCambios(event){
        setValorFiltro(event.target.value); 
    }
        return (
            <form onSubmit={(event) => evitarSubmit(event)}>
                <label>Filtrar por título:</label>
                <input type="text" onChange={(event) => controlarCambios(event)} value={valorFiltro} />
            </form>
        )
    }

export default Filtro