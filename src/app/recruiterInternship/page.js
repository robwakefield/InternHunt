'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button";
import { ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';

function RecruiterInternship() {
  const [post, setPost] = useState({name: "", applications: []});

  useEffect(() => {
    fetch('/api/post')
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <main className="recruiterInternship">
      <Button href="./recruiterDashboard">Return to Dashboard</Button>
      <Card>
        <Card.Header>{post.name}</Card.Header>
        <Card.Body>
          <Nav fill className="justify-content-center">
            <ApplicantList post={post}/>
            <SkillList />
          </Nav>
        </Card.Body>
      </Card>
    </main>
  );
}

export default RecruiterInternship;

class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: props.post.applications
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.post !== this.props.post) {
      this.setState({ applications: this.props.post.applications });
    }
  }
  render() {
    return (
      <ListGroup>{this.state.applications.map((application) => (<ListGroupItem key={application.student.name}>{application.student.name}</ListGroupItem>))}</ListGroup>
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
      <ListGroup>{this.skills.map((skill) => (<ListGroupItem key={skill.name}>{skill.name}</ListGroupItem>))}</ListGroup>
    )
  }
}
