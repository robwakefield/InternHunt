'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import starStyle from './Star.module.css';
import './viewApplicants.css'
import { Accordion, Button, Card, Col, Container, ListGroup, ListGroupItem, Nav, PageItem, Pagination, Row, Modal, Form} from "react-bootstrap";
import { Component, useEffect, useState, useRef} from "react";
import RecruiterNavbar from "../../recruiterNavbar";
import { BsSearch, BsSortDown } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import '../../globals.css'
import { useParams, useRouter, notFound } from "next/navigation";

function averageRating(application) {
  if (application.evidences.length == 0) return 0;
  return application.evidences.map(ev => ev.rating).reduce((a, b) => a + b, 0) / application.evidences.length;
}

function ViewApplicants() {
  const [post, setPost] = useState({name: "", applications: []});
  const [selectedApplicant, setSelectedApplicant] = useState(-1);

  const router = useRouter()
  const params = useParams()
  const postId = params.postId

  useEffect(() => {
    fetch('/api/post/' + postId)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  if (post == undefined) {
    notFound();
  }

  return (
    <main className="viewApplicants">
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
          <Card.Header>{postId}</Card.Header>
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

export default ViewApplicants;

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
            this.state.applications.map((application, i) => (
              <ListGroupItem className={(i == this.props.selectedApplicant)? "selectedApplicantListItem" : "applicantListItem"} key={application.student.name}>
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
  state = { skills: [], name: ""}

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        skills: (this.props.selectedApplicant != -1 ? this.props.post.applications[this.props.selectedApplicant].evidences : []),
        name: (this.props.selectedApplicant != -1 ? this.props.post.applications[this.props.selectedApplicant].student.name + "'s Application" : "")
      });
    }
  }
  render() {
    this.state.skills.sort((a, b) => a.requirement.requirementText >= b.requirement.requirementText ? 1 : -1)
    return (
      <Container style={{height: "70vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button>See Documents </Button>
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
                      studentID={this.props.post.applications[this.props.selectedApplicant].student.id}
                      requirementID={skill.requirement.id}
                      ratingSchemeList={[this.props.post.rating1Text,
                        this.props.post.rating2Text,
                        this.props.post.rating3Text,
                        this.props.post.rating4Text,
                        this.props.post.rating5Text]}
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

const StarRating = ({ initialRating, post, setPost, studentID, requirementID, ratingSchemeList }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [show, setShow] = useState(new Array(6).fill(false));
  const [modalShow, setModalShow] = useState(false);

  const schemeRef = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

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

  const updateRatingScheme = (event) => {
    event.preventDefault();

    fetch('/api/ratingScheme', {
      method: 'PUT',
      body: JSON.stringify({
        postID: post.id,
        rating1Text: schemeRef[0].current.value,
        rating2Text: schemeRef[1].current.value,
        rating3Text: schemeRef[2].current.value,
        rating4Text: schemeRef[3].current.value,
        rating5Text: schemeRef[4].current.value,
      })
    });
  };

  const handleClick = index => {
    selectRating(index + 1);
    setShow(prev => {
      const newShow = [...prev];
      newShow[index] = !newShow[index];
      return newShow;
    });
  };

  const handleHover = index => {
    setShow(prev => {
      const newShow = [...prev];
      newShow[index] = true;
      return newShow;
    });
  };

  const handleHoverOut = index => {
    setShow(prev => {
      const newShow = [...prev];
      newShow[index] = false;
      return newShow;
    });
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
          return (
          <button
            type="button"
            key={index + 1}
            className={index + 1 <= (hover || rating) ? starStyle.on : starStyle.off}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(rating)}
            >
            <OverlayTrigger
              trigger="manual"
              show={show[index]}
              key={index}
              placement="top"
              overlay={
                <Popover
                  id={`popover-positioned-${index}`}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => handleHoverOut(index)}>
                  <Popover.Header as="h3">
                  <Container fluid>
                    <Row>
                      <Col sm={9} >{`Star Rating - ${index + 1}`} </Col>
                        <Col sm={3} ><Button size="sm" onClick={function (event) { handleModalShow()}}>Edit</Button></Col>
                    </Row>
                  </Container>
                  </Popover.Header>
                  <Popover.Body>
                    {ratingSchemeList[index]}
                  </Popover.Body>
                </Popover>
              }>
                <span><Modal
                show={modalShow}
                onHide={handleModalClose}
                backdrop="static"
                    keyboard={false}
                    centered
                >
                  <Form onSubmit={updateRatingScheme}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Rating Scheme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {ratingSchemeList.map((rateSchemeText, rateNum) => {
                        return (<Form.Group className="mb-3" controlId={`rating-${rateNum}`} key={`rating-${rateNum}`}>
                          <Form.Label><strong>Rating {rateNum} Description</strong></Form.Label>
                          <Form.Control contenteditable="true" type="textarea" placeholder="Enter description on this" defaultValue={rateSchemeText} ref={schemeRef[rateNum]}/>
                        </Form.Group>); })}
                    
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" type="submit" >Save</Button>
                      <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                      </Modal.Footer>
                  </Form>
                </Modal>
                <span className="star">
                
                <AiFillStar size={20}
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHoverOut(index)} />
                  </span>
                </span>
                
              
              </OverlayTrigger>
              
            </button>
          
        );}
      )}
    </div>
  );
};
