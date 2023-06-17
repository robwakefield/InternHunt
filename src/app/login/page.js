
'use client'

import { useState, useEffect } from "react";
import { Card, ListGroup, Nav, Container, Tab, FloatingLabel, Form, Button, InputGroup, Tabs} from 'react-bootstrap';
import LinkedInLogin from '../linkedInLogin';
import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import "./background.css"
import {FcReadingEbook, FcBusinessman} from "react-icons/fc"
import Cookies from "universal-cookie"
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

function Login() {
    const blue = "#034687"
    const red = "#E10032"
    const cookies = new Cookies();
    const urlParams = useSearchParams();
    const queryPostID = parseInt(urlParams.get('postID'));
    const [user, setUser] = useState("Student");
    const [bgColor, setbgColor] = useState(blue)
    const inputName = useRef();
    const email = useRef();
    const password = useRef();

    const switchUser = () => {
        if (user === "Student") {
            return "Recruiter";
        ;
        }
        return "Student";
        
    }

    const switchColor = () => {
        if (bgColor === blue) {
            return red;
        }
        return blue;
        
    }

    const login = (id, userType) => {
        cookies.set("userType", userType)
        cookies.set("studentID", id)

        if (isNaN(queryPostID)) {
            window.history.back(1);
        }
        window.location.replace("/applyPage?postID=" + queryPostID);
        
    }

    const handleError = () => { }

    const signin = () => {
        fetch('/api/' + user.toLowerCase() + 'Signin', {
            method: "POST",
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value
            })
          }).then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    handleError()
                } else {
                    login(data.id, user);
                }
            });
    }

    const signup = () => {
        fetch('/api/' + user.toLowerCase() + 'SignUp', {
            method: "POST",
            body: JSON.stringify({
                name: inputName.current.value,
                email: email.current.value,
                password: password.current.value
            })
          }).then((response) => response.json())
            .then((data) => { login(data.id, data.user) });
    }

    return (
        <div>
            <ul className="loginBackground">
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
                <li style={{borderColor: bgColor}}></li>
            </ul>
    <Card className="loginCard" style={{ margin: '12rem', width: '30rem' }}>
    
        <Card.Header>
            <strong className="alignleft">
                {(user === "Student")? <FcReadingEbook size={30} /> : <FcBusinessman size = {30} />}
                {user} Login
            </strong>
                    <a className="alignright" onClick={() => { setUser(switchUser());  setbgColor(switchColor())}}>I am a {switchUser(user)}</a>
        </Card.Header>
        <ListGroup variant="flush">
        <ListGroup.Item>
        <Tab.Container className="p-3 my-5 d-flex flex-column w-50" defaultActiveKey="signIn">
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link eventKey="signIn">Sign in</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="signUp">Sign up</Nav.Link>
            </Nav.Item>
        </Nav>
        <Tab.Content>
                <Tab.Pane eventKey="signIn">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" ref={email}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" ref={password}/>
                </FloatingLabel>                        

                <Button onClick={signin} className="mb-4 w-100">Sign in</Button>
            </Tab.Pane>
            <Tab.Pane eventKey="signUp">

                <FloatingLabel controlId="floatingName" label="Full Name">
                    <Form.Control type="text" placeholder="Full Name" ref={inputName}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                <Form.Control type="email" placeholder="name@example.com" ref={email}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" ref={password}/>
                </FloatingLabel>
                        
                

                <Button onClick={signup} className="mb-4 w-100">Sign up</Button>
                </Tab.Pane>
                </Tab.Content>
                </Tab.Container>
            </ListGroup.Item>
        </ListGroup>
            </Card>
        </div>
        
        );
}

export default Login;