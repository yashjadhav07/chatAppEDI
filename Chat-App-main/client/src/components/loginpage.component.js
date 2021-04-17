import React, { Component } from "react";
import axios from "axios";

import { Alert, Container, Row, Form, Button, Nav } from "react-bootstrap";

const port = process.env.REACT_APP_SERVER_PORT;

export default class Login extends Component {
    state = {
        email: "",
        password: "",
        flag: false,
    };

    // Updating values in state
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    // Submitting Query to the API
    submit = (event) => {
        event.preventDefault();
        const payLoads = {
            email: this.state.email,
            password: this.state.password,
        };
        axios({
            url: `http://localhost:${port}/users/login`,
            method: "POST",
            data: payLoads,
        })
        .then((res) => {
            this.setState({ message: "Login success", atype: "success", flag: "true" });
            localStorage.setItem("login", JSON.stringify(this.state.flag));
            localStorage.setItem(
                "auth-token",
                JSON.stringify({ ...res.headers, "auth-token": res.data })
            );
            console.log({ ...res.headers, "auth-token": res.data });
            window.location.reload(false);
        })
        .catch((res) => {
            this.setState({
                message: "Invalid Email or Password",
                atype: "danger",
                flag: false,
            });
            console.log(payLoads, res.data, "Internal Server error");
        });
    };

    render() {
        return (
            <Container className="logreg-forms App-header py-5">
                <Alert variant={this.state.atype}>{this.state.message}</Alert>
                <Form className="form-signin" onSubmit={this.submit}>
                    <Nav fill variant="pills" activeKey="1" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link eventKey="1">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={this.props.mode} eventKey="2" href="/register">
                                Register
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: sundarp@gmail.com"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </Form.Row>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="************"
                            name="password"
                            onChange={this.handleChange}
                        />
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        );
    }
}