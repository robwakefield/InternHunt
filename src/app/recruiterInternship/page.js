'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import starStyle from './Star.module.css';
import './recruiterInternship.css'
import { Accordion, Button, Card, Col, Container, ListGroup, ListGroupItem, Nav, Row } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";
import { BsSearch, BsSortDown } from 'react-icons/bs';
import '../globals.css'

function RecruiterInternship() {
  const [post, setPost] = useState({name: "", applications: []});

  useEffect(() => {
    fetch('/api/post')
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <main className="recruiterInternship">
      <RecruiterNavbar></RecruiterNavbar>
      <Card>
        <Card.Header>{post.name}</Card.Header>
        <Card.Body>
          <Row>
            <Col xs={4}>
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
            <Button className="sortButton"><BsSortDown color="black" size={30}/></Button>
            <h4>Applicants</h4>
            <Button className="searchButton"><BsSearch color="black" size={30}/></Button>
          </Card.Header>
        
          <ListGroup> {
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
          
          <Accordion>{
            this.skills.map((skill) => (
              <Accordion.Item eventKey={skill.name} key={skill.name}>
                <Accordion.Header>{skill.name}</Accordion.Header>
                <Accordion.Body>
                  <Card><Card.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</Card.Body></Card>
                <Card className="ratingCard" ><Card.Body style={{ alignSelf: "flex-end" }}><StarRating /></Card.Body></Card>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      </Container>
    )
  }
}

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
          return (
          <button
            type="button"
            key={index + 1}
            className={index + 1 <= (hover || rating) ? starStyle.on : starStyle.off}
            onClick={() => setRating(index + 1)}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(rating)}
            onDoubleClick={() => {setRating(0); setHover(0);}}
          >
            <span className="star">&#9733;</span>
          </button>
        );}
      )}
    </div>
  );
};
