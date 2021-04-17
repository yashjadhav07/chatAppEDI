/*
import React, { Component, useState, useEffect ,useRef } from "react";

// Importing the Components from react-bootstrap
import { Container, Jumbotron } from "react-bootstrap";

import "../assets/css/chat.scss";

import { DoDecrypt, DoEncrypt } from "../aes.js";
import { process } from "../store/action/index";
import { useDispatch } from "react-redux";

export default function Chat({ username, roomname, socket }) {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const dispatch = useDispatch();

    const dispatchProcess = (encrypt, msg, cipher) => {
        dispatch(process(encrypt, msg, cipher));
    };

    useEffect(() => {
        socket.on("message", (data) => {
        //decypt
        const ans = DoDecrypt(data.text, data.username);
        dispatchProcess(false, ans, data.text);
        console.log(ans);
        let temp = messages;
        temp.push({
            userId: data.userId,
            username: data.username,
            text: ans,
        });
        setMessages([...temp]);
        });
    }, [socket]);

    const sendData = () => {
        if (text !== "") {
            //encrypt here
            const ans = DoEncrypt(text);
            socket.emit("chat", ans);
            setText("");
        }
    };
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

  //  render() {
        return (
            <Container fluid>
                <Jumbotron className={`${this.props.mode} py-5 px-5 m-0`}>
                    <div className="chat">
                        <div className="user-name">
                            <h2>
                                <span style={{ fontSize: "1rem" }}>{this.state.roomname}</span>
                            </h2>
                        </div>
                        <div className="chat-message">
                            {this.state.messages.map((i) => {
                                if (i.username === this.state.username) {
                                    return (
                                        <div className="message">
                                            <p>{i.text}</p>
                                            <span>{i.username}</span>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="message mess-right">
                                            <p>{i.text} </p>
                                            <span>{i.username}</span>
                                        </div>
                                    );
                                }
                            })}
                            <div />
                        </div>
                        <div className="send">
                            <input
                                placeholder="enter your message"
                                value={this.state.text}
                                onChange={e => this.setState({text: e.target.value})}
                                onKeyPress={e => {if (e.key === "Enter") this.sendData();}}
                            ></input>
                            <button  onClick={this.sendData}>Send</button>
                        </div>
                    </div>
                </Jumbotron>
            </Container>
        );
  //  }
}
*/

import React, { useState, useEffect, useRef } from "react";
import "./chat.scss";
import { DoDecrypt, DoEncrypt } from "../aes.js";
import { useDispatch } from "react-redux";
import { process } from "../store/action/index";

function Chat({ username, roomname, socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt
      const ans = DoDecrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      //encrypt here
      const ans = DoEncrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");

  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <div className="message">
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            return (
              <div className="message mess-right">
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
