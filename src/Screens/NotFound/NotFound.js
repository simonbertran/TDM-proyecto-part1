import React, { Component } from "react";
import "./NotFound.css";
import Header from "../../Components/Header/Header";

class NotFound extends Component {
    render() {
        return (
            <div className="not-found-title">
                <Header />
                <h1 className="not-found-title"> Error 404: La Pagina no existe</h1>
            </div>
        );
    }
}

export default NotFound
