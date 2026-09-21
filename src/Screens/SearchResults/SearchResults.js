import React, { Component } from 'react';
import "./SearchResults.css"
import MovieCard from '../../Components/MovieCard/MovieCard';
import Header from '../../Components/Header/Header';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datosSearch: [],
      cargando: true,
      tipo: ''
    };
  }

  componentDidMount() {
    const nombreBusqueda = this.props.match.params.name;
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=a86dfc3e8792d8c35b2b0bcfae9f4488&include_adult=false&language=en-US&query=${nombreBusqueda}`)
            .then(response => response.json())
            .then(data => {
              let resultados = data.results || []
              this.setState({ datosSearch: resultados.filter((item) => item.media_type !== "person"), cargando: false, tipo: '' })
            })            
            .catch(error => console.log(error))
  }


render() {
    return (
      <div>
         <Header />
        <h2>Resultados de búsqueda</h2>
        {this.state.cargando ? 
        (<h3>Cargando resultados...</h3>) : 
        (
          <section className="Section-data">
            {this.state.datosSearch.map((Peli) => (
            <MovieCard key={Peli.id} Peli={Peli} tipo={Peli.media_type} />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default SearchResults