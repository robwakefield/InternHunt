'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import starStyle from './Star.module.css';
import './recruiterInternship.css'
import { Accordion, Button, Card, Col, Container, ListGroup, ListGroupItem, Nav, Row } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";
import { BsSearch, BsSortDown } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai'
import '../globals.css'

function averageRating(application) {
  if (application.evidences.length == 0) return 0;
  return application.evidences.map(ev => ev.rating).reduce((a, b) => a + b, 0) / application.evidences.length;
}

function RecruiterInternship() {
  const [post, setPost] = useState({name: "", applications: []});
  const [selectedApplicant, setSelectedApplicant] = useState(-1);

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
              <ApplicantList post={post} setSelectedApplicant={setSelectedApplicant}/>
            </Col>
            <Col>
              <SkillList post={post} setPost={setPost} selectedApplicant={selectedApplicant}/>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </main>
  );
}

export default RecruiterInternship;

class ApplicantList extends Component {
  selectApplicant = (n) => () => {this.props.setSelectedApplicant(n);}
  state = { applications: this.props.post.applications };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ applications: this.props.post.applications });
    }
  }
  render() {
    this.state.applications.sort((a, b) => averageRating(b) - averageRating(a));
    return (
      <Container style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button className="sortButton"><BsSortDown color="black" size={30}/></Button>
            <h4>Applicants</h4>
            <Button className="searchButton"><BsSearch color="black" size={30}/></Button>
          </Card.Header>
        
          <ListGroup> {
            this.state.applications.map((application, i) => (
              <ListGroupItem className="applicantListItem" key={application.student.name}>
                <Container fluid style={{ cursor: "pointer" }} onClick={this.selectApplicant(i)}>
                  <Row className="applicantListRow">
                    <Col sm={9} className="studentNameCol"><p className="text-left studentName">{application.student.name} </p></Col>
                    <Col sm={3} className="avgRatingCol"><p className="text-center avgRating">{averageRating(application)}</p><AiFillStar style={{alignContent: "center"}} size={30}  color="#ffc800"/></Col>
                  </Row>
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
  state = { skills: [] }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        skills: (this.props.selectedApplicant != -1 ? this.props.post.applications[this.props.selectedApplicant].evidences : [])
      });
    }
  }
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
            this.state.skills.map((skill) => (
              <Accordion.Item eventKey={skill.requirement.requirementText} key={skill.requirement.requirementText}>
                <Accordion.Header>{skill.requirement.requirementText}</Accordion.Header>
                <Accordion.Body>
                  <Card><Card.Body>{skill.evidenceText}</Card.Body></Card>
                  <Card className="ratingCard"><Card.Body style={{ alignSelf: "flex-end" }}>
                    <StarRating 
                      initialRating={skill.rating}
                      post={this.props.post}
                      setPost={this.props.setPost}
                      studentID={this.props.post.applications[this.props.selectedApplicant].student.id}
                      requirementID={skill.requirement.id}
                    />
                  </Card.Body></Card>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>
      </Container>
    )
  }
}

const StarRating = ({ initialRating, post, setPost, studentID, requirementID }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const selectRating = (n) => {
    setRating(n);

    const newPost = {...post};
    newPost.applications
      .filter(app => app.student.id == studentID)
      .flatMap(app => app.evidences)
      .filter(ev => ev.requirement.id == requirementID)
      .forEach(ev => {ev.rating = n})
    setPost(newPost);

    fetch('/api/rating', {
      method: 'PUT',
      body: JSON.stringify({
        studentID: studentID,
        postID: post.id,
        requirementID: requirementID,
        rating: n
      })
    });
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
          return (
          <button
            type="button"
            key={index + 1}
            className={index + 1 <= (hover || rating) ? starStyle.on : starStyle.off}
            onClick={() => selectRating(index + 1)}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(rating)}
          >
              <span className="star"><AiFillStar size={20} /></span>
          </button>
        );}
      )}
    </div>
  );
};
