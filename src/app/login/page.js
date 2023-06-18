
'use client'

import { useState, useEffect } from "react";
import { Card, ListGroup, Nav, Container, Tab, FloatingLabel, Form, Button, InputGroup, Tabs} from 'react-bootstrap';
import LinkedInLogin from '../linkedInLogin';
import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import "../loginBackground.css"
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
    const [errorMessage, setErrorMessage] = useState("")
    const inputName = useRef();
    const emailSignIn = useRef();
    const passwordSignIn = useRef();
    const emailSignUp = useRef();
    const passwordSignUp = useRef();

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
    
    const handleWrongPassword = () => {
        setErrorMessage("Wrong password");
    }

    const login = (id, userType) => {
        cookies.set("userType", userType)
        cookies.set("studentID", -1)
        cookies.set("recruiterID", -1)

        if (userType === "Student") {
            cookies.set("studentID", id)
            console.log(queryPostID)
            if (isNaN(queryPostID)) {
                window.location.replace("/studentDashboard"); 
                return;
            }
            window.location.replace("/applyPage?postID=" + queryPostID);

        } else if (userType === "Recruiter") {
            cookies.set("recruiterID", id)
            window.location.replace("/recruiterDashboard");
            return;
        } else {
            return;
        }
        
    }

    const handleNoAccount = () => {
        setErrorMessage("Account not found");
    }

    const handleDuplicatedAccount = () => {
        setErrorMessage("An Account has been signed up using this email");
    }

    const signin = () => {
        fetch('/api/' + user.toLowerCase() + 'SignIn', {
            method: "POST",
            body: JSON.stringify({
                email: emailSignIn.current.value.toLowerCase(),
            })
        }).then((response) => {
            if (response) {
                return response.json();
            } else {
                return response;
            }
        })
        .then((data) => {
            if (data) {
                setErrorMessage("");
                if (data.password !== passwordSignIn.current.value) {
                    handleWrongPassword()
                    return;
                }
                login(data.id, user);
            } else {
                handleNoAccount()
            }
        });
    }

    const signup = () => {
        fetch('/api/' + user.toLowerCase() + 'SignUp', {
            method: "POST",
            body: JSON.stringify({
                name: inputName.current.value,
                email: emailSignUp.current.value.toLowerCase(),
                password: passwordSignUp.current.value
            })
          }).then((response) => {
            if (response) {
                return response.json();
            } else {
                return response;
            }
            })
            .then((data) => {
                if (data) {
                    setErrorMessage("");
                    login(data.id, user);
                } else {
                    handleDuplicatedAccount()
                }
            });
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
        <div className="logo">
            <img
                alt=""
                src="/favicon.ico"
                width="30"
                height="30" />
            <strong>InternHunt</strong>
        </div>
        
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
            <Nav.Link onClick={() => setErrorMessage("")} eventKey="signIn">Sign in</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setErrorMessage("")} eventKey="signUp">Sign up</Nav.Link>
            </Nav.Item>
            </Nav>
        <Tab.Content>
                <Tab.Pane eventKey="signIn">
                    
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" ref={emailSignIn}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" ref={passwordSignIn}/>
                </FloatingLabel>                        
                <p color="red">{errorMessage}</p>
                                    

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
                <Form.Control type="email" placeholder="name@example.com" ref={emailSignUp}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" ref={passwordSignUp}/>
                </FloatingLabel>
                <p color="red">{errorMessage}</p>
                

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