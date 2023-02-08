// import React, { Component } from "react";

// class Login extends Component {
//   render() {
//     return <div>Login!!!</div>;
//   }
// }

// export default Login;

import React from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@mui/material';
import axios from 'axios';
// const bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {

    // const pwd = bcrypt.hashSync(this.state.password, salt);
    const pwd = this.state.password;
    console.log(`process.env.REACT_APP_NODE_SERVER : ${process.env.REACT_APP_NODE_SERVER}`)
    console.log(`process.env.API_SHOBIZ_SERVICE_SERVICE_HOST : ${process.env.API_SHOBIZ_SERVICE_SERVICE_HOST}`)
    console.log(`process.env.UI_SHOBIZ_SERVICE_SERVICE_HOST : ${process.env.UI_SHOBIZ_SERVICE_SERVICE_HOST}`)
    
    const backendUrl = process.env.REACT_APP_NODE_SERVER ?? 'localhost'

    axios.post(`http://${backendUrl}/login`, {
      username: this.state.username,
      password: pwd,
    }).then((res) => {
      alert("Logged in Succesfully");
      sessionStorage.setItem('token', res.data.token);
      console.log('sessionStorage : ' + sessionStorage.getItem('token'))
      this.props.history.push('/dashboard');
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }


  render() {
    return (
      <div>
        <div style={{ marginTop: '200px' }}>
          <div>
            <h1 className='width: 80%'>Shobiz Events</h1>
          </div>
          <div>
            <h2>Login</h2>
          </div>

          <div>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              placeholder="User Name"
              required
            />
            <br /><br />
            <TextField
              id="standard-basic"
              type="password"
              autoComplete="off"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Password"
              required
            />
            <br /><br />
            <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={this.state.username === '' && this.state.password === ''}
              onClick={this.login}
            >
              Login
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
