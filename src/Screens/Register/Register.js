import React, { Component } from "react";


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    controlarEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    controlarPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    evitarSubmit(event) {
        event.preventDefault();

        let usuarios = [];
        let recuperoStorage = localStorage.getItem('usuarios');

        if (recuperoStorage !== null) {
            usuarios = JSON.parse(recuperoStorage);
        }

//Verificamos que el mail no este en uso
        let usuarioExiste = usuarios.filter(usuario => usuario.email === this.state.email);

        if (usuarioExiste.length > 0) {
            this.setState({
                error: 'El email ya se encuentra registrado.'

            });
            return;
        }

// verificamos que la contra sea mayor a 6 digitos
        if (this.state.password.length < 6) {
            this.setState({
                error: 'La contraseña debe tener al menos 6 caracteres.'
            });
            return;
        }

        let nuevoUsuario = {
            email: this.state.email,
            password: this.state.password
        };
        usuarios.push(nuevoUsuario);

        let usuariosToString = JSON.stringify(usuarios);
        localStorage.setItem('usuarios', usuariosToString);

//Una vez terminado lo manda al login
        this.props.history.push('/login');
    }

    render() {
        return (
            <main className="login">
                <div className="login-card">

                    <h1>Registrarme</h1>

                    <p className="login-subtitle">
                        Crea tu cuenta.
                    </p>

                    <form onSubmit={(event) => this.evitarSubmit(event)}>

                        <div className="login-field">
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Ingresá tu email"
                                value={this.state.email}
                                onChange={(event) => this.controlarEmail(event)}
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
                                onChange={(event) => this.controlarPassword(event)}
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

export default Register;