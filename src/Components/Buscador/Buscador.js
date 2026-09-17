import "./Buscador.css"
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
    };
  }

  controlarCambios(event) {
    this.setState({
      busqueda: event.target.value
    });
  }

  evitarSubmit(event) {
    event.preventDefault();
    if (this.state.busqueda !== '') {
      this.props.history.push('/searchresults/movie/' + this.state.busqueda);
    }
  }

  render() {
    return (
      <form onSubmit={(event) => this.evitarSubmit(event)}>
        <input
          type="text"
          placeholder="Buscar pelicula/serie..."
          onChange={(event) => this.controlarCambios(event)}
          value={this.state.busqueda}
        />
        <button type="submit">Buscar</button>
      </form>
    );
  }
}

export default withRouter(Buscador);