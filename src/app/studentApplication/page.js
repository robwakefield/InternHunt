'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import { useEffect, useState, useRef } from 'react';
import StudentNavbar from "../studentNavbar";
import { Card } from "react-bootstrap";
import {BsSortDown} from 'react-icons/bs'
import '../globals.css'

function StudentApplication() {
  const langRef = useRef();
  const mathRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/student', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language : langRef.current.value,
        maths : mathRef.current.value
      }),
    });
  }

  const [student, setStudent] = useState([]);
  useEffect(() => {
    fetch('/api/student')
      .then((response) => response.json())
      .then((data) => {setStudent(data)} );
  }, []);

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
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Language Skills changed</Accordion.Header>
            <Accordion.Body>
            <Form.Group className="mb-3" controlId="formGroupSkill1">
              <Form.Control as="textarea" rows={3} placeholder="Enter your evidence of the skill" defaultValue={student.language} ref={langRef}/>
            </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Proficient in Maths</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3" controlId="formGroupSkill2">
                <Form.Control as="textarea" rows={3} placeholder="Enter your evidence of the skill" defaultValue={student.maths} ref={mathRef}/>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Form>
        </Card>
        </Container>
      
    </main>
  );
}

export default StudentApplication;
