import React, { Component } from "react";
import "./Register.css";

class Register extends Component {
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

        let emailEnUso = usuarios.filter(
            usuario => usuario.email === this.state.email
        );

        if (emailEnUso.length > 0) {
            this.setState({
                error: "El email ya está en uso."
            });
            return;
        }

        if (this.state.password.length < 6) {
            this.setState({
                error: "La contraseña debe tener un mínimo de 6 caracteres."
            });
            return;
        }

        let nuevoUsuario = {
            email: this.state.email,
            password: this.state.password
        };

        usuarios.push(nuevoUsuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        this.props.history.push("/login");
    }

    render() {
        return (
            <main className="register">
                <div className="register-card">

                    <h1>Crear cuenta</h1>

                    <p className="register-subtitle">
                        Registrate para guardar tus películas y series favoritas.
                    </p>

                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <div className="register-field">
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

                        <div className="register-field">
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
                            <p className="register-error">
                                {this.state.error}
                            </p>
                            :
                            null
                        }

                        <button
                            className="register-button"
                            type="submit"
                        >
                            Crear cuenta
                        </button>

                    </form>

                </div>
            </main>
        );
    }
}

export default Register;