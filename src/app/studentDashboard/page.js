'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useRef } from 'react';

function StudentDashboard() {
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
    <main className="studentDashboard">
      <Nav fill className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <h6>3 Requirements Matched </h6>
        </Nav.Item>
        <Nav.Item>
        <h4>Your Application </h4>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Upload CV</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <Form onSubmit={handleSubmit}>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Language Skill</Accordion.Header>
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
    </main>
  );
}

export default StudentDashboard;
