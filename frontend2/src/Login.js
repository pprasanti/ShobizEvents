import React from 'react';
import sweetalert from 'sweetalert';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    Login = () => {
        // const pwd = this.state.password;

        axios.post(process.env.API_URL + '/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.id);
                // this.props.history.push('/dashboard');
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.errorMessage) {
                    sweetalert({
                        text: err.response.data.errorMessage,
                        icon: "error",
                        type: "error"
                    });
                }
            })
    }

    render() {
        return (
            <div style={{ marginTop: '200px' }}>
                <div>
                    <h2>Login</h2>
                </div>

                <div>
                    <text
                        id="standard-basic"
                        type="text"
                        autoComplete="off"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        placeholder="User Name"
                        required
                    ></text>
                    <br /><br />
                    <text
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
                    <button
                        className="button_style"
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={this.state.username == '' && this.state.password == ''}
                        onClick={this.login}
                    >
                        Login
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <link href="/register">
                        Register
                    </link> */}
                </div>
            </div>
        );
    }

}