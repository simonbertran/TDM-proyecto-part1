import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Login.css";

const cookies = new Cookies();

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let usuario = usuarios.find(
            usuario => usuario.email === this.state.email
        );

        if (!usuario || usuario.password !== this.state.password) {
            this.setState({
                error: "Credenciales incorrectas."
            });
            return;
        }

        cookies.set("user-auth-cookie", usuario.email);

        this.props.history.push("/");
    }

    render() {
        return (
            <main className="login">
                <div className="login-card">

                    <h1>Iniciar sesión</h1>

                    <p className="login-subtitle">
                        Ingresá a tu cuenta para ver tus favoritos.
                    </p>

                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <div className="login-field">
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Ingresá tu email"
                                value={this.state.email}
                                onChange={(event) => this.handleChange(event)}
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label>Contraseña</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Ingresá tu contraseña"
                                value={this.state.password}
                                onChange={(event) => this.handleChange(event)}
                                required
                            />
                        </div>

                        {this.state.error !== "" ?
                            <p className="login-error">
                                {this.state.error}
                            </p>
                            :
                            null
                        }

                        <button
                            className="login-button"
                            type="submit"
                        >
                            Ingresar
                        </button>

                    </form>

                </div>
            </main>
        );
    }
}

export default Login;