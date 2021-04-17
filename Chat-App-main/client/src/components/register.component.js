import React, { Component } from "react";
import axios from "axios";

import { Container, Row, Alert, Form, Button, Nav } from "react-bootstrap";

export default class AddUser extends Component {
    state = {
        fname: "",
        lname: "",
        fullName: function () {
            return this.fname + " " + this.lname;
        },
        email: "",
        password: "",
        atype: "",
        message: "",
    };

    // Updating values in state
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };
    
    // Submitting Query to the API
    submit = (event) => {
        event.preventDefault();
        const payLoad = {
            fname: this.state.fullName(),
            email: this.state.email,
            password: this.state.password,
        };
        axios({
            url: "http://localhost:5000/users/register",
            method: "POST",
            data: payLoad,
        })
        .then(() => {
            this.setState({
                atype: "success",
                message: "Registration Successfull !",
            });
            console.log("New User Data Has Been Sent to User");
        })
        .catch(() => {
            this.setState({
                atype: "danger",
                message: "There was some problem !",
            });
            console.log("Internal Server error");
        });
    };

    render() {
        return (
            <Container className="logreg-forms App-header py-5">
                <Alert variant={this.state.atype}>{this.state.message}</Alert>
                <Form className="form-signin" onSubmit={this.submit}>
                    <Nav fill variant="pills" activeKey="2" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link className={this.props.mode} href="/" eventKey="1">
                                Login
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2">Register</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label column sm="2">
                            First&nbsp;Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Sundar"
                            name="fname"
                            onChange={this.handleChange}
                        />
                    </Form.Row>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label column sm="2">
                            Last&nbsp;Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Pichai"
                            name="lname"
                            onChange={this.handleChange}
                        />
                    </Form.Row>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Ex: sundarp@gmail.com"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </Form.Row>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="************"
                            name="password"
                            onChange={this.handleChange}
                        />
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Container>
        );
    }
}
