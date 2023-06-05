'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Navbar, Card, ListGroupItem } from "react-bootstrap";

function recruiterDashboard() {
const handleClick = () => {
  window.location.href = "./recruiterInternship";
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
      <Container  style={{height: "100px"}}>
        <Card className="h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button>Sort</Button>
            <h4>My Listings</h4>
            <Button>New Post</Button>
          </Card.Header>

          <ListGroup>

            <ListGroupItem>
              <Container className="d-flex justify-content-between" onClick={handleClick}>
                <p className="text-danger">Applications Closed</p>
                <p className="text-center">IT Intern</p>
                <p className="text-success">3/50 Applications</p>
              </Container>
            </ListGroupItem>

            <ListGroupItem>
              <Container className="d-flex justify-content-between" onClick={handleClick}>
                <p className="text-success">Applications Open</p>
                <p className="text-center">Softare Engineer Intern</p>
                <p className="text-warning">30/35 Applications</p>
              </Container>
            </ListGroupItem>

            <ListGroupItem>
              <Container className="d-flex justify-content-between" onClick={handleClick}>
                <p className="text-muted">Draft</p>
                <p className="text-center">Management Intern</p>
                <p></p>
              </Container>
            </ListGroupItem>

          </ListGroup>
        </Card>
      </Container>
    </main>

    
  );
}

export default recruiterDashboard;