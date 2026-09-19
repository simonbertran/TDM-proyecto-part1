import "./Filtro.css";
import React, { Component } from "react";

class Filtro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valorFiltro: ''
        }
    }

    evitarSubmit(event) {
        event.preventDefault()
    }

    controlarCambios(event) {
        this.setState({ valorFiltro: event.target.value }, () => this.props.filtrar(this.state.valorFiltro));
    }

    render() {
        return (
            <form onSubmit={(event) => this.evitarSubmit(event)}>
                <label>Filtrar por título:</label>
                <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valorFiltro} />
            </form>
        )
    }
}

export default Filtro