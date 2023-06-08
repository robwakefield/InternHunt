'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import starStyle from './Star.module.css';
import './recruiterInternship.css'
import { Accordion, Button, Card, Col, Container, ListGroup, ListGroupItem, Nav, PageItem, Pagination, Row } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";
import { BsSearch, BsSortDown } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import '../globals.css'

function averageRating(application) {
  if (application.evidences.length == 0) return 0;
  return application.evidences.map(ev => ev.rating).reduce((a, b) => a + b, 0) / application.evidences.length;
}

function selectedApplicant(selected, applications) {
  if (selected == -1) return;
  return applications.filter((application) => application.student.id == selected)[0];
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
      <Container>
        <Nav className="mt-2">
          <Pagination>
            <PageItem href="./recruiterDashboard">
              Back to Dashboard
            </PageItem>
          </Pagination>
        </Nav>
        <Card>
          <Card.Header>{post.name}</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={4}>
                <ApplicantList post={post} setSelectedApplicant={setSelectedApplicant} selectedApplicant={selectedApplicant}/>
              </Col>
              <Col>
                <SkillList post={post} setPost={setPost} selectedApplicant={selectedApplicant}/>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
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
      <Container style={{height: "70vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button className="sortButton"><BsSortDown color="black" size={30}/></Button>
            <h4>Applicants</h4>
            <Button className="searchButton"><BsSearch color="black" size={30}/></Button>
          </Card.Header>
        
          <ListGroup> {
            this.state.applications.map((application) => (
              <ListGroupItem className={(application.student.id == this.props.selectedApplicant)? "selectedApplicantListItem" : "applicantListItem"} key={application.student.name}>
                <Container fluid style={{ cursor: "pointer" }} onClick={this.selectApplicant(application.student.id)}>
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
  state = { skills: [], name: ""}

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        skills: (this.props.selectedApplicant != -1 ? selectedApplicant(this.props.selectedApplicant, this.props.post.applications).evidences : []),
        name: (this.props.selectedApplicant != -1 ? selectedApplicant(this.props.selectedApplicant, this.props.post.applications).student.name + "'s Application" : "")
      });
    }
  }
  render() {
    this.state.skills.sort((a, b) => a.requirement.requirementText >= b.requirement.requirementText ? 1 : -1)
    return (
      <Container style={{height: "70vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button>See Documents</Button>
            <h4>{this.state.name}</h4>
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
                      studentID={selectedApplicant(this.props.selectedApplicant, this.props.post.applications).student.id}
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

class StarRating extends Component {
  state = { rating: 0, hover: 0 };
  
  constructor(props) {
    super(props);
    this.setState({
      rating: props.initialRating,
      hover: props.initialRating
    });
  }

  selectRating(n) {
    this.setState({ ...this.state, rating: n });

    const newPost = {...this.props.post};
    newPost.applications
      .filter(app => app.student.id == this.props.studentID)
      .flatMap(app => app.evidences)
      .filter(ev => ev.requirement.id == this.props.requirementID)
      .forEach(ev => {ev.rating = n})
    this.props.setPost(newPost);

    fetch('/api/rating', {
      method: 'PUT',
      body: JSON.stringify({
        studentID: this.props.studentID,
        postID: this.props.post.id,
        requirementID: this.props.requirementID,
        rating: n
      })
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ rating: this.props.initialRating, hover: this.props.initialRating });
    }
  }

  render() {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
            return (
            <button
              type="button"
              key={index + 1}
              className={index + 1 <= (this.state.hover || this.state.rating) ? starStyle.on : starStyle.off}
              onClick={() => this.selectRating(index + 1)}
              onMouseEnter={() => this.setState({ ...this.state, hover: index + 1 })}
              onMouseLeave={() => this.setState({ ...this.state, hover: this.state.rating })}
              >
              <OverlayTrigger
                key={index}
                placement="top"
                overlay={
                  <Popover id={`popover-positioned-${index}`}>
                    <Popover.Header as="h3">{`Star Rating - ${index + 1}`}</Popover.Header>
                    <Popover.Body>
                      <strong>Just Mention</strong> Need more concrete examples
                    </Popover.Body>
                  </Popover>
                }>
                <span className="star">
                <AiFillStar size={20} />
                
                </span>
              </OverlayTrigger>
            </button>
          );}
        )}
      </div>
    );
  }

}
