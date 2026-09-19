import "./LogOut.css";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class LogOut extends Component {
    logout() {
        cookies.remove('user-auth-cookie');
        this.props.history.push('/login');}

        render() {
            return (
                <button onClick={() => this.logout()}>
                    Log Out
                </button>
            );
        }
    }


export default withRouter(LogOut);