'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Navbar, Card } from "react-bootstrap";

function recruiterDashboard() {
const handleClick = () => {
  alert("Going to Intern Page!")
}

  return (
    <main className="recruiterDashboard">
      {/* Navigation Title Bar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Container className="d-flex justify-content-start">
            <Navbar.Brand>My Company</Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="./recruiterInternship">Rate Candidates</Nav.Link>
            </Nav>
          </Container>
          <Button>Search</Button>
        </Container>
      </Navbar>
      
      {/* Job Listings List */}
      <Container>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Button>Sort</Button>
            <h4>My Listings</h4>
            <Button>New Post</Button>
          </Card.Header>
        </Card>
      </Container>
    </main>

    
  );
}

export default recruiterDashboard;