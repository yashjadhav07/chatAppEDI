import React, { Component } from "react";

// Importing the Components from react-bootstrap
import { Container, Jumbotron } from "react-bootstrap";

export default class DashBoard extends Component {
    render() {
        return (
            <Container fluid>
                <Jumbotron className={`${this.props.mode} py-5 px-5 m-0`}>
                    <h1 className={this.props.mode}>Dashboard</h1>
                </Jumbotron>
            </Container>
        );
    }
}
