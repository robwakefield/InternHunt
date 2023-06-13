
'use client'

import { useState } from "react";
import { Card, ListGroup, Nav, Container, Tab, FloatingLabel, Form, Button, InputGroup, Tabs} from 'react-bootstrap';
import LinkedInLogin from '../linkedInLogin';
import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import {FcReadingEbook, FcBusinessman} from "react-icons/fc"

function Login() {
    const [justifyActive, setJustifyActive] = useState('tab1');;
    const [logedIn, setLogedIn] = useState(false);
    const [user, setUser] = useState("Student");

    const switchUser = () => {
        if (user ===  "Student") {
            return "Recruiter";
        ;
        }
        return "Student";
    }

    return (
        <Card className="loginCard" style={{ margin: '12rem', width: '30rem' }}>
        
            <Card.Header>
                <strong class="alignleft">
                    {(user === "Student")? <FcReadingEbook size={30} /> : <FcBusinessman size = {30} />}
                    {user} Login
                </strong>
                <a class="alignright" href={"#" + user} onClick={() => setUser(switchUser(user))}>I am a {switchUser(user)}</a>
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
                        <LinkedInLogin/>
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
                        <LinkedInLogin />
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
        );
}

export default Login;