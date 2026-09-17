import React, { Component } from 'react';
import "./SearchResults.css"
import MovieCard from '../../Components/MovieCard/MovieCard';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datosSearch: [],
      cargando: true
    };
  }

  componentDidMount() {
    const nombreBusqueda = this.props.match.params.name;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&query=${nombreBusqueda}`)
            .then(response => response.json())
            .then(data => this.setState({ datosSearch: data.results || [], cargando:false }))
            .catch(error => console.log(error))
  }

  
render() {
    return (
      <div>
        <h2>Resultados de búsqueda</h2>
        {this.state.cargando ? 
        (<h3>Cargando resultados...</h3>) : 
        (
          <section className="Section-data">
            {this.state.datosSearch.map((Peli) => (
              <MovieCard key={Peli.id} Peli={Peli} />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default SearchResults