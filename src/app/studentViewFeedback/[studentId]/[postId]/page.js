'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import'./studentViewFeedback.css'
import starStyle from '../../../viewApplicants/[postId]/Star.module.css';
import { Accordion, Button, Card, Col, Container, ListGroup, ListGroupItem, Nav, PageItem, Pagination, Row, Modal, Form} from "react-bootstrap";
import { Component, useEffect, useState, useRef} from "react";
import StudentNavbar from "../../../studentNavbar";
import { BsSearch, BsSortDown } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import '../../../globals.css';
import { useParams, useRouter, notFound } from "next/navigation";

function averageRating(application) {
  if (!application) return 0;
  if (application.evidences.length == 0) return 0;
  return application.evidences.map(ev => ev.rating).reduce((a, b) => a + b, 0) / application.evidences.length;
}

function StudentViewFeedback() {
  const [post, setPost] = useState({name: "", applications: [], description: "", requirements: []});
  const [showJobListing, setJobListing] = useState(false);

  const handleClose = () => setJobListing(false);
  const handleShow = () => setJobListing(true);

  const router = useRouter()
  const params = useParams()
  const studentId = params.studentId
  const postId = params.postId

  useEffect(() => {
    fetch('/api/feedback/' + postId)
        .then((response) => response.json())
        .then((data) => setPost(data));
  }, []);

  if (post == undefined) {
    notFound();
  }
  

  return (
    <main className="StudentViewFeedback">
      <StudentNavbar></StudentNavbar>
      <Container>
        <Nav className="mt-2">
          <Pagination>
            <PageItem href={"/studentDashboard?studentID=" + studentId}>
              Back to Dashboard{console.log(post)}
            </PageItem>
          </Pagination>
        </Nav>
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col xs={10}>Your Application for <strong>{post.name}</strong></Col>
                <Col xs={2}><Button style={{float: "right"}} variant="primary" onClick={handleShow}>
                  View Job Listing
                </Button>

              <Modal show={showJobListing} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{post.name}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                      <strong>Description:</strong><br></br>
                      {post.description}<br></br><br></br>
                      <strong>Requirements:</strong>
                      {post.requirements.map((requirement, index) => (
                        <p key={index}>- {requirement.requirementText}</p>
                      ))}
                    </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal></Col>
              </Row>
            </Container>
          </Card.Header>
          <Card.Body>
            <SkillList post={post} setPost={setPost} studentId={studentId}/>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}

export default StudentViewFeedback;

class SkillList extends Component {
  state = { skills: [], name: "", showDocs: false}
  getSelectedStudent = () => this.props.post.applications.filter(app => app.student.id == this.props.studentId)[0];

  handleDocsShow = () => {
    this.setState({ showDocs: true });
  }

  handleDocsClose = () => {
    this.setState({ showDocs: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        skills: (this.props.studentId != -1 ? this.getSelectedStudent().evidences : []),
        name: (this.props.studentId != -1 ? this.getSelectedStudent().student.name + "'s Application" : "")
      });
    }
  }
  render() {
    this.state.skills.sort((a, b) => a.requirement.requirementText >= b.requirement.requirementText ? 1 : -1)
    return (
      <Container style={{height: "70vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
             <Modal className="docModal" show={this.state.showDocs} onHide={this.handleDocsClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Documents</Modal.Title>
                </Modal.Header>
              <Modal.Body >
              <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                  <Nav.Link eventKey="doc-1">CV</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="doc-2" >Cover Letter</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="doc-3" >Transcript</Nav.Link>
                </Nav.Item>
              </Nav>
                    <iframe src="http://docs.google.com/gview?url=http://infolab.stanford.edu/pub/papers/google.pdf&embedded=true" style={{width: "60vw", height:"30vw"}} frameborder="0"></iframe>
                    </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleDocsClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid style={{ cursor: "pointer" }}>
              <Row className="applicantListRow">
                <Col sm={2} style={{float: "left"}}><Button  variant="primary" onClick={this.handleDocsShow}>View Documents</Button></Col>
                <Col sm={9} className="studentNameCol"><h3 className="text-center studentName">Application Unsuccessful</h3></Col>
                <Col sm={1} style={{float: "right"}} className="avgRatingCol" ><p className="text-right avgRating">{averageRating(this.getSelectedStudent())}</p><AiFillStar style={{alignContent: "center"}} size={30}  color="#ffc800"/></Col>
              </Row>
            </Container>
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
                      studentID={this.getSelectedStudent().student.id}
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
  constructor(props) {
    super(props);
    this.state = {
      rating: props.initialRating,
      hover: props.initialRating,
      showPopUp: new Array(6).fill(false),
      modalShow: false,
      ratingTextList: [props.post.rating1Text,
        props.post.rating2Text,
        props.post.rating3Text,
        props.post.rating4Text,
        props.post.rating5Text]
    };
  }
  
  handleModalShow = () => {
    this.setState({ modalShow: true });
  }

  handleModalClose = () => {
    this.setState({ modalShow: false });
  }

  handleClick(index) {
    const newShow = this.state.showPopUp;
    newShow[index] = !newShow[index];
    this.setState({showPopUp: newShow });
  }

  handleHover(index) {
    const newShow = this.state.showPopUp;
    newShow[index] = true;
    this.setState({showPopUp: newShow });
  }

  handleHoverOut(index) {
    const newShow = this.state.showPopUp;
    newShow[index] = false;
    this.setState({showPopUp: newShow });
  }


  selectRating(n) {
    this.setState({rating: n });

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

  updateRatingScheme = (event) => {
    event.preventDefault();
  
    // Create a new array to store the new textarea values
    let newTextareaValues = [];
    
    // Loop through the refs and get the value of each textarea
    for (let i = 0; i < this.state.ratingTextList.length; i++) {
      newTextareaValues.push(this[`textarea_${i}`].value);
    }

    this.setState({ ratingTextList: newTextareaValues })
  
    // Update the state
    fetch('/api/ratingScheme', {
      method: 'PUT',
      body: JSON.stringify({
        postID: this.props.post.id,
        rating1Text: this[`textarea_0`].value,
        rating2Text: this[`textarea_1`].value,
        rating3Text: this[`textarea_2`].value,
        rating4Text: this[`textarea_3`].value,
        rating5Text: this[`textarea_4`].value,
      })
    });

    const newPost = {...this.props.post};
    newPost.rating1Text = this[`textarea_0`].value;
    newPost.rating2Text = this[`textarea_1`].value;
    newPost.rating3Text = this[`textarea_2`].value;
    newPost.rating4Text = this[`textarea_3`].value;
    newPost.rating5Text = this[`textarea_4`].value;
    console.log(newPost);
    this.props.setPost(newPost);
  };


  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ rating: this.props.initialRating, hover: this.props.initialRating, ratingTextList: [this.props.post.rating1Text,
        this.props.post.rating2Text,
        this.props.post.rating3Text,
        this.props.post.rating4Text,
        this.props.post.rating5Text]});
    }
  }

  render = () => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
            return (
            <button
              type="button"
              key={index + 1}
              className={index + 1 <= (this.state.hover || this.state.rating) ? starStyle.on : starStyle.off}
              >
              <OverlayTrigger
              trigger="manual"
              show={this.state.showPopUp[index]}
              key={index}
              placement="top"
              overlay={
                <Popover
                  id={`popover-positioned-${index}`}
                  onMouseEnter={() => this.handleHover(index)}
                  onMouseLeave={() => this.handleHoverOut(index)}>
                  <Popover.Header as="h3">
                    {`Star Rating - ${index + 1}`} 
                  </Popover.Header>
                  <Popover.Body>
                    {this.state.ratingTextList[index]}
                  </Popover.Body>
                </Popover>
              }>
                <span className="star">
                  <AiFillStar size={20}
                    onClick={() => this.handleClick(index)}
                    onMouseEnter={() => this.handleHover(index)}
                    onMouseLeave={() => this.handleHoverOut(index)} />
                  </span>
                
              </OverlayTrigger>

            </button>
          );}
        )}
      </div>
    );
  }

}
