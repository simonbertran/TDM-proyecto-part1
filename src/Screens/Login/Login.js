import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let usuario = usuarios.find(
      usuario => usuario.email === this.state.email
    );

    if (!usuario || usuario.password !== this.state.password) {
      this.setState({
        error: 'Credenciales incorrectas'
      });

      return;
    }

    cookies.set('user-auth-cookie', usuario.email);

    this.props.history.push('/');
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>

        <form onSubmit={(event) => this.handleSubmit(event)}>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(event) => this.handleChange(event)}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(event) => this.handleChange(event)}
          />

          {this.state.error !== '' ?
            <p className="error">{this.state.error}</p>
            :
            null
          }

          <button type="submit">
            Ingresar
          </button>

        </form>
      </div>
    );
  }
}

export default Login;