'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Navbar } from "react-bootstrap";

function recruiterDashboard() {
const handleClick = () => {
  alert("Going to Intern Page!")
}

  return (
    <main className="recruiterDashboard">
      <Navbar bg="light" expand="lg">
        <Container className="d-flex justify-content-center">
          <Container className="flex-fill d-flex justify-content-start">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="./recruiterInternship">Rate Candidates</Nav.Link>
            </Nav>
          </Container>
          <Navbar.Brand className="text-center">My Listings</Navbar.Brand>
          <Container className="flex-fill d-flex justify-content-end">
            <Button>New Listing</Button>
          </Container>
        </Container>
      </Navbar>
      
      <Container>
        <ListGroup>
          <ListGroup.Item>
            <Nav justify onClick={handleClick} >
              <Nav.Item>Open</Nav.Item>
              <Nav.Item>IT Intern</Nav.Item>
              <Nav.Item>3/50 Remaining</Nav.Item>
            </Nav>
        </ListGroup.Item>
        </ListGroup>
      </Container>
    </main>
    
    
  );
}

export default recruiterDashboard;