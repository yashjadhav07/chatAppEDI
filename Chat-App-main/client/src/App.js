import React from "react";
import "./assets/css/App.css";
import Process from "./process/process";
import Home from "./home/home";
//import io from "socket.io-client";
// Importing Required logos
import logo from "./assets/images/logo.svg";
import dark from "./assets/images/DarkMode.svg";
import light from "./assets/images/LightMode.svg";
import userLight from "./assets/images/user-light.svg";
import userDark from "./assets/images/user-dark.svg";
import logoutLight from "./assets/images/logoutLight.svg";
import logoutDark from "./assets/images/logoutLight.svg";

// Importing react-bootstrap & Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton, Form, Navbar } from "react-bootstrap";

// Importing Router from react-dom
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Importing the components
import DashBoard from "./components/dashboard.component";
import Register from "./components/register.component";
import Login from "./components/loginpage.component";
import Chat from "./chat/chat";
import jwt_decode from "jwt-decode";

import io from "socket.io-client";
const socket = io("https://chatapprishabh098.azurewebsites.net");


function Appmain(props) {
  return (
    <React.Fragment>
      <div className="right">
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
      <div className="left">
        <Process />
      </div>
    </React.Fragment>
  );
}

// Main Driver App
export default function App() {
    // Authentication
    const nameDecoder = () => {
        if (localStorage.getItem("auth-token")) {
            const tokenStr = localStorage.getItem("auth-token");
            const splitTokenStr = tokenStr.split(",");
            const targetToken = splitTokenStr[2].split('"');
            const decoded = jwt_decode(targetToken[3]);
            return decoded.fname;
        } else {
            return "";
        }
    };

    // Dark Mode Implementation
    const [darkMode, setDarkMode] = React.useState(false);
    const [login, setLogin] = React.useState(false);
    React.useEffect(() => {
        const data = localStorage.getItem("darkmode");
        if (data) {
            setDarkMode(JSON.parse(data));
        }
        const data1 = localStorage.getItem("login");
        if (data1) {
            setLogin(JSON.parse(data1));
        }
    }, []);
    React.useEffect(() => {
        localStorage.setItem("darkmode", JSON.stringify(darkMode));
        localStorage.setItem("login", JSON.stringify(login));
    });
    const onLogout = () => {
        setLogin(!login);
        localStorage.setItem("auth-token", "");
    };

    if (login) {
        return (
            <Router>
                <div className={darkMode ? "App-dark" : "App-light"}>
                    <Navbar className={darkMode ? "bag-dark navbar-dark" : " "}>
                        <Navbar.Brand className="mr-auto" href="/">
                            <img
                                alt=""
                                src={logo}
                                width="60"
                                height="60"
                                className="d-inline-block align-top"
                            />{" "}
                        </Navbar.Brand>
                        <Form inline variant={darkMode ? "dark" : "light"}>
                            <img
                                alt=""
                                src={darkMode ? userDark : userLight}
                                width="40"
                                height="40"
                                className="m-2 d-inline-block align-top"
                            />{" "}
                            <DropdownButton
                                variant={darkMode ? "dark" : "light"}
                                drop="down"
                                id="dropdown-basic-button"
                                title={nameDecoder()}
                            >
                                <Dropdown.Item onClick={onLogout} variant={darkMode ? "dark" : "light"}>
                                    <img
                                        alt=""
                                        src={darkMode ? logoutLight : logoutDark}
                                        width="17"
                                        height="17"
                                        className="m-1 d-inline-block align-top"
                                    />{" "}
                                    Logout
                                </Dropdown.Item>
                            </DropdownButton>
                            <img
                                alt=""
                                src={darkMode ? light : dark}
                                width="70"
                                height="70"
                                className="d-inline-block align-top"
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                }}
                            />
                        </Form>
                    </Navbar>
                    <div className="App">
                      <Switch>
                        <Route path="/" exact>
                          <Home socket={socket} />
                        </Route>
                        <Route path="/chat/:roomname/:username" component={Appmain} />

                      </Switch>

                    </div>

                    /*<Route
                        path="/"
                        exact
                        render={() => <Chat mode={darkMode ? "dark" : "light"} />}
                    />*/
                </div>
            </Router>
        );
    } else {
      return (
        <Router>
            <div className={darkMode ? "App-dark" : "App-light"}>
                <Navbar className={darkMode ? "bag-dark navbar-dark" : " "}>
                    <Navbar.Brand className="mr-auto" href="/">
                        <img
                            alt=""
                            src={logo}
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                        />{" "}
                    </Navbar.Brand>
                    <img
                        alt=""
                        src={darkMode ? light : dark}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        onClick={() => {
                            setDarkMode(!darkMode);
                        }}
                    />
                </Navbar>
                <Route
                    path="/"
                    exact
                    render={() => <Login mode={darkMode ? "dark" : "light"} />}
                />
                <Route
                    path="/register"
                    exact
                    render={() => <Register mode={darkMode ? "dark" : "light"} />}
                />
            </div>
        </Router>
      );
    }
}
