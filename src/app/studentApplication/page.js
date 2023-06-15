'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import { Component, useEffect, useState, useRef } from 'react';
import StudentNavbar from "../studentNavbar";
import { Card, Col, Row ,Nav, Pagination, PageItem} from "react-bootstrap";
import '../globals.css'
import DocxExtractor from "./DocxExtractor";
import Modal from 'react-bootstrap/Modal';
import GenerateAnswerButton from "./generateAnswerButton";

function StudentApplication() {
  const [postID, setPostID] = useState(-1);
  const [studentID, setStudentID] = useState(-1);
  const [application, setApplication] = useState({submitted: false, evidences: [], post: {}, cv: null, extractedCV: ""});
  const [showUploader, setShowUploader] = useState(false);
  const [showJobListing, setJobListing] = useState(false);

  const handleCloseJobListing = () => setJobListing(false);
  const handleShowJobListing = () => setJobListing(true);

  const handleUploaderClose = () => setShowUploader(false);
  const handleUploaderShow = () => setShowUploader(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryStudentID = parseInt(urlParams.get('studentID'));
    const queryPostID = parseInt(urlParams.get('postID'));
    
    if (isNaN(queryStudentID) || isNaN(queryPostID)) window.location.replace("/");
    setStudentID(queryStudentID);
    setPostID(queryPostID);
    
    fetch('/api/studentApplication', {
      method: "POST",
      body: JSON.stringify({
        studentID: queryStudentID,
        postID: queryPostID
      })
    }).then((response) => response.json())
      .then((data) => { setApplication(data); });
  }, []);

  return (
    <main className="studentApplication">
      <StudentNavbar></StudentNavbar>
      
      <Container style={{ height: "80vh" }}>
        <Nav className="mt-2">
            <Pagination>
              <PageItem href={"/studentDashboard?studentID=" + studentID}>
                Back to Dashboard
              </PageItem>
            </Pagination>
          </Nav>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            
            <Row>
              {application.submitted ? <Col xs={7}><h4>Submitted</h4></Col> : null}
              <Col xs={5}><Button  style={{float: "left"}} variant="primary" onClick={handleShowJobListing}>
                  ViewListing
                </Button>

              <Modal show={showJobListing} onHide={handleCloseJobListing}>
                <Modal.Header closeButton>
                  <Modal.Title>{application.post.name}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                      <strong>Description:</strong><br></br>
                      {application.post.description}<br></br><br></br>
                      <strong>Requirements:</strong>
                      {application.evidences.map((evidence, index) => (
                        <p key={index}>- {evidence.requirement.requirementText}</p>
                      ))}
                    </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseJobListing}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal></Col>
            </Row>
            
            
            
            <h4>{application.post.name}</h4>
            <Button variant={application.cv ? "success" : "danger"} onClick={handleUploaderShow}>Your CV</Button>
            <Modal show={showUploader} onHide={handleUploaderClose}>
              <Modal.Header closeButton>
                <Modal.Title>Your CV</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>CV must be in (.doc, .docx)</p>
                <DocxExtractor
                  setApplication={setApplication}
                  application={application}
                  postID={postID}
                  studentID={studentID}
                />
                <p>
                  {application.cv && (
                    <embed
                      src={`${application.cv}`}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    />
                  )}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleUploaderClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Header>

          <Form>
            <EvidenceEntryList extractedCV={application.extractedCV} application={application} postID={postID} studentID={studentID}/>
          </Form>
        </Card>
      </Container>
    </main>
  );
}

export default StudentApplication;

class EvidenceEntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extractedCV: props.extractedCV,
      evidences: props.application.evidences,
      entryValues: props.application.evidences.map((evidence) => evidence.evidenceText)
    }
  }
  handleAutoSave = () => {
    this.state.evidences.forEach((evidence, i) => {
      fetch("/api/studentApplication", {
        method: "PUT",
        body: JSON.stringify({
          studentID: this.props.studentID,
          postID: this.props.postID,
          requirementID: evidence.requirementID,
          evidenceText: this.state.entryValues[i]
        })
      })
    });
  }

  handleSubmitApplication = () => {
      // submit application (this should create stages)
      fetch("/api/submitApplication", {
        method: "PUT",
        body: JSON.stringify({
          studentID: this.props.studentID,
          postID: this.props.postID,
        })
      });
      // Set "Submit Application" stage in application
      fetch('/api/stage', {
        method: 'PUT',
        body: JSON.stringify({
          postID: this.props.postID,
          studentID: this.props.studentID,
          stageID: 2, // Submit Application
          completed: true,
          date: new Date(Date.now()),
          override: false
        })
      });
      window.location.reload(false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        extractedCV: this.props.extractedCV,
        evidences: this.props.application.evidences,
        entryValues: this.props.application.evidences.map((evidence) => evidence.evidenceText)
      });
    }
  }

  // Change by text input
  updateEntryValue = (i, value) => {
    this.setState((prev) => {
      const updatedEntryValues = prev.entryValues;
      updatedEntryValues[i] = value;
      return {
        ...prev,
        entryValues: updatedEntryValues
      }
    }, () => { this.handleAutoSave(); });
  }

  render() {
    return (
      <div className="evidenceEntryList">
        <Accordion defaultActiveKey={['0']} alwaysOpen>{
          this.state.evidences.map((evidence, i) => {
            return (
              <Accordion.Item eventKey={i} key={i}>
                <Accordion.Header>{evidence.requirement.requirementText}</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId={"formGroupEvidence" + i}>
                  <Form.Control
                    as="textarea"
                    disabled={this.props.application.submitted}
                    rows={3}
                    placeholder="Enter your evidence of the skill"
                    defaultValue={evidence.evidenceText}
                    value={this.state.entryValues[i]}
                    onChange={(event) => {
                      this.updateEntryValue(i, event.target.value)
                    }}
                  />
                  </Form.Group>
                  <GenerateAnswerButton
                    submitted={this.props.application.submitted}
                    jobName = {this.props.application.post.name}
                    extractedCV={this.state.extractedCV}
                    requirement = {evidence.requirement.requirementText}
                    evidence={i}
                    updateEntryValue={this.updateEntryValue} />
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        }
        </Accordion>
        <Button className = {this.props.application.submitted? "invisible" : "visible"} variant="primary" onClick={this.handleSubmitApplication}>
          Submit application
        </Button>
      </div>
    );
  }
}
