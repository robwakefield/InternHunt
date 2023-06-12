'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import { Component, useEffect, useState, useRef } from 'react';
import StudentNavbar from "../studentNavbar";
import { Card } from "react-bootstrap";
import {BsSortDown} from 'react-icons/bs'
import '../globals.css'
import DocxExtractor from "./DocxExtractor";
import Modal from 'react-bootstrap/Modal';

function StudentApplication() {
  const [postID, setPostID] = useState(-1);
  const [studentID, setStudentID] = useState(-1);
  const [application, setApplication] = useState({ evidences: [] });
  const [extractedCV, setExtractedCV] = useState("")
  const [showUploader, setShowUploader] = useState(false);

  const handleUploaderClose = () => setShowUploader(false);
  const handleUploaderShow = () => setShowUploader(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryStudentID = parseInt(urlParams.get('studentID'));
    const queryPostID = parseInt(urlParams.get('postID'));
    if (isNaN(queryStudentID) || isNaN(queryPostID)) window.location.replace("/studentDashboard");
    setStudentID(queryStudentID);
    setPostID(queryPostID);
    
    fetch('/api/studentApplication', {
      method: "POST",
      body: JSON.stringify({
        studentID: queryStudentID,
        postID: queryPostID
      })
    }).then((response) => response.json())
      .then((data) => {setApplication(data)});
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <main className="studentApplication">
      <StudentNavbar></StudentNavbar>
      <Container style={{ height: "80vh" }}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button className="sortButton"><BsSortDown color="black" size={30}/></Button>
            <h4>IT Intern</h4>
            <Button onClick={handleUploaderShow}>Upload CV</Button>
            <Modal show={showUploader} onHide={handleUploaderClose}>
              <Modal.Header closeButton>
                <Modal.Title>Upload CV</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>CV must be in (.doc, .docx)</p>
                <DocxExtractor extractedCV={extractedCV} setExtractedCV={setExtractedCV}></DocxExtractor></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleUploaderClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUploaderClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Header>

          <Form onSubmit={handleSubmit}>
            <EvidenceEntryList application={application} postID={postID} studentID={studentID}/>
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
      evidences: props.application.evidences,
      entryValues: props.application.evidences.map((evidence) => evidence.evidenceText)
    }
  }
  handleSubmit = () => {
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
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        evidences: this.props.application.evidences,
        entryValues: this.props.application.evidences.map((evidence) => evidence.evidenceText)
      });
    }
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
                <Form.Group className="mb-3" controlId={"formGroupEvidence"+i}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your evidence of the skill"
                    defaultValue={evidence.evidenceText}
                    onChange={(event) => {
                      const updatedEntryValues = [...this.state.entryValues];
                      updatedEntryValues[i] = event.target.value;
                      this.setState({ entryValues: updatedEntryValues });
                    }}
                  />
                </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        }
        </Accordion>
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}
