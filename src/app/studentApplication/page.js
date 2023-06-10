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

function StudentApplication() {
  const [application, setApplication] = useState({ evidences: [] });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentID = parseInt(urlParams.get('studentID'));
    const postID = parseInt(urlParams.get('postID'));
    if (isNaN(studentID) || isNaN(postID)) window.location.replace("/studentDashboard");
    
    fetch('/api/studentApplication', {
      method: "POST",
      body: JSON.stringify({
        studentID: studentID,
        postID: postID
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
            <Button>Upload CV</Button>
          </Card.Header>
      
          <Form onSubmit={handleSubmit}>
            <EvidenceEntryList application={application}/>
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
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{evidence.requirement.requirementText}</Accordion.Header>
                <Accordion.Body>
                <Form.Group className="mb-3" controlId={"formGroupEvidence"+i}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your evidence of the skill"
                    defaultValue={evidence.evidenceText}
                    onChange={(event) => {
                      this.setState({ inputValue: event.target.value });
                    }}
                  />
                </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        }
        </Accordion>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    );
  }
}
