'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Nav, Row } from "react-bootstrap";
import { Component, useEffect, useState } from "react";

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
          <Row>
            <Col>
              <ApplicantList post={post}/>
            </Col>
            <Col>
              <SkillList />
            </Col>
          </Row>
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
      <Container style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button>Sort</Button>
            <h4>Applicants</h4>
            <Button>Search</Button>
          </Card.Header>
        
          <ListGroup componentClass="ul"> {
            this.state.applications.map((application) => (
              <ListGroupItem key={application.student.name}>
                <Container className="d-flex justify-content-between" style={{cursor: "pointer"}}>
                <p className="text-center">{application.student.name}</p>
                </Container>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>
      </Container>
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
      <Container style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button>See Documents</Button>
            <h4>Skills</h4>
            <Button>Accept</Button>
          </Card.Header>
          
          <ListGroup componentClass="ul">{
            this.skills.map((skill) => (
              <ListGroupItem key={skill.name}>
                <Container className="d-flex justify-content-between" style={{cursor: "pointer"}}>
                <p className="text-center">{skill.name}</p>
                </Container>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>
      </Container>
    )
  }
}
