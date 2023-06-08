'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobDescription() {
  const descRef = useRef();
  
  const [description, setDescription] = useState('');
  useEffect(() => {
    fetch('/api/listings')
      .then((response) => response.json())
      .then((data) => setDescription(data.description));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/listings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description : descRef.current.value
      }),
    });
  }

  return (
    <Card className="mt-4 mb-2 mx-3">
      <Card.Header className="d-flex justify-content-between">
      <p>Job Description (Autosave ON)</p>
      <Button>Edit</Button>
      </Card.Header>
      <Form.Group className="mb-3" controlId="formJobDesc">
        <Form.Control as="textarea" rows={3} placeholder="Enter your Job Description" defaultValue={description} ref={descRef} onChange={handleSubmit}/>
      </Form.Group>
    </Card>
  )
}

export default JobDescription;