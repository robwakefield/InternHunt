'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobDescription() {
  const descRef = useRef();

  const [post, setPost] = useState({description: "", requirements: []});
  useEffect(() => {
    fetch('/api/listingEdit')
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/listingEdit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description : descRef.current.value,
        requirements: post.requirements
      }),
    });
  }

  return (
    <Form>
      <Card className="mt-4 mb-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Job Description (Autosave ON)</p>
        <Button onClick={handleSubmit}>Save</Button>
        </Card.Header>
          <Form.Group className="mb-3" controlId="formJobDesc">
            <Form.Control as="textarea" rows={3}
              placeholder="Enter your Job Description" defaultValue={post.description}
              ref={descRef} />
          </Form.Group>
      </Card>
    </Form>
  )
}

export default JobDescription;