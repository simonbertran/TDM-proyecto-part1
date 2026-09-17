import React, { Component } from "react";
import MovieSec from "../../Components/MovieSection/MovieSection";
import Buscador from "../../Components/Buscador/Buscador";

class Home extends Component {
    render() {
        return (
            <div>
                <Buscador />
                <MovieSec />
            </div>
        );
    }
}

export default Home