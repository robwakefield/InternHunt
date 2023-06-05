'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { ListGroup } from "react-bootstrap";

function recruiterDashboard() {
const handleClick = () => {
  alert("Going to Intern Page!")
}

  return (
    <main className="recruiterDashboard">
      <Nav justify activeKey="/home">
      <Nav.Item><Nav.Link href="./studentDashboard">to studentDashboard</Nav.Link></Nav.Item>
      <Nav.Item>
      <h1>Job Listings</h1>
      </Nav.Item>
      <Nav.Item><Nav.Link href="./recruiterInternship">Rate Candidates</Nav.Link></Nav.Item>
      <Nav.Item><Button>New Listing</Button></Nav.Item>
      </Nav>
      
      <ListGroup>
        <ListGroup.Item>
          <Nav justify onClick={handleClick} >
          <Nav.Item>Open</Nav.Item>
          <Nav.Item>IT Intern</Nav.Item>
          <Nav.Item>3/50 Remaining</Nav.Item>
          </Nav>
      </ListGroup.Item>
      <ListGroup.Item>
          <Nav justify onClick={handleClick}>
          <Nav.Item>Closed</Nav.Item>
          <Nav.Item>Software Engineer Intern</Nav.Item>
          <Nav.Item>30/50 Remaining</Nav.Item>
          </Nav>
      </ListGroup.Item>
      <ListGroup.Item>
          <Nav justify onClick={handleClick}>
          <Nav.Item>Draft</Nav.Item>
          <Nav.Item>Manangement Intern</Nav.Item>
          <Nav.Item></Nav.Item>
          </Nav>
      </ListGroup.Item>
      </ListGroup>
    </main>
    
    
  );
}

export default recruiterDashboard;