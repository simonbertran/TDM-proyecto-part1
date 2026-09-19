import "./Home.css";
import React, { Component } from "react";
import MovieSec from "../../Components/MovieSection/MovieSection";
import Buscador from "../../Components/Buscador/Buscador";
import Header from '../../Components/Header/Header';

class Home extends Component {
    render() {
        return (
            <div>
                 <Header />
                <Buscador />
                <MovieSec />
            </div>
        );
    }
}

export default Home