import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
       this.setState({
           [event.target.name]: event.target.value,
           errorText: ""
       })
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions",
            {
                client: {
                    email: this.state.email,
                    password: this.state.password
                }
            },

            { withCredentials: true }
        )
            .then(response => {
                console.log(response)
                if (response.data.status === 'created') {
                    this.props.handleSuccessfulAuth();
                } else {
                    this.setState({
                        errorText: "Whoops! looks like you are using the wrong email or password."
                    })
                    this.props.handleUnSuccessfulAuth();
                }
            })
            .catch(error => {
                this.setState({
                    errorText: "An Error Occurred"
                });
                this.props.handleUnSuccessfulAuth();
            });
        

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Login To Access Your Dashboard</h1>
                
                <form onSubmit={this.handleSubmit}>

                    <div>{this.state.errorText}</div>

                    <input 
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}