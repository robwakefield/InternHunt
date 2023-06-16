
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

function Login() {
    const blue = "#034687"
    const red = "#E10032"
    const cookies = new Cookies();
    const urlParams = useSearchParams();
    const queryPostID = parseInt(urlParams.get('postID'));
    const [user, setUser] = useState("Student");
    const [token, setToken] = useState("");
    const [bgColor, setbgColor] = useState(blue)
    
    

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

    const login = () => {
        cookies.set("loggedIn", true)
        cookies.set("token", token)
        cookies.set("userType", user)
        cookies.set("studentID", 1)

        if (isNaN(queryPostID)) {
            window.history.back(1);
        }
        window.location.replace("/applyPage?postID=" + queryPostID);
        
    }

    useEffect(() => {
        if (token === "") {
            return
        }
        login();
    }, [token]);

    

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
                <div className="text-center mb-3">
                    <LinkedInLogin setToken={setToken}/>
                </div>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>                        

                <Button className="mb-4 w-100">Sign in</Button>
            </Tab.Pane>
            <Tab.Pane eventKey="signUp">
                <div className="text-center mb-3">
                    <LinkedInLogin setToken={setToken}></LinkedInLogin>
                </div>

                <FloatingLabel controlId="floatingName" label="Name">
                    <Form.Control type="text" placeholder="Name" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                        
                

                <Button className="mb-4 w-100">Sign up</Button>
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