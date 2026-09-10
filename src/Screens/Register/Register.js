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
      <div className="register">
        <h1>Crear Cuenta</h1>

        <form onSubmit={(event) => this.handleSubmit(event)}>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={(event) => this.handleChange(event)}
            />
          </div>

          {this.state.error !== "" ?
            <p className="error">{this.state.error}</p>
            :
            null
          }

          <button type="submit">
            Crear cuenta
          </button>

        </form>
      </div>
    );
  }
}

export default Register;