'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button";
import { ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';

function RecruiterInternship() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch('/api/post')
      .then((response) => response.json())
      .then((data) => {setPost(data)});
  }, []);

  return (
    <main className="recruiterInternship">
      <Button href="./recruiterDashboard">Return to Dashboard</Button>
      <Card>
        <Card.Header>{post.name}</Card.Header>
        <Card.Body>
          <Nav fill className="justify-content-center">
            <ApplicantList />
            <SkillList />
          </Nav>
        </Card.Body>
      </Card>
    </main>
  );
}

export default RecruiterInternship;

class ApplicantList extends Component {
  applicants = [
    {name: "applicant1"},
    {name: "applicant2"},
    {name: "applicant3"}
  ];
  render() {
    return (
      <ListGroup componentClass="ul">{this.applicants.map((applicant) => (<ListGroupItem key={applicant.name}>{applicant.name}</ListGroupItem>))}</ListGroup>
    )
  }
}

class SkillList extends Component {
  skills = [
    {name: "skill1"},
    {name: "skill2"},
    {name: "skill3"}
  ];
  render() {
    return (
      <ListGroup componentClass="ul">{this.skills.map((skill) => (<ListGroupItem key={skill.name}>{skill.name}</ListGroupItem>))}</ListGroup>
    )
  }
}
