'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobRequirementsList() {
  const reqRef = useRef();

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
        description: post.description,
        requirements: post.requirements
      }),
    });
  }

  return (
    <Form>
      <Card className="my-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Requirements</p>
        <ButtonGroup>
          {/* <Button>Add</Button> */}
          <Button onClick={handleSubmit}>Save</Button>
          {/* <Button>Remove</Button> */}
        </ButtonGroup>
        </Card.Header>
          {post.requirements.map((requirement) =>
            <JobRequirementsItem key={requirement.id} requirement={requirement} reqRef={reqRef} />)}
      </Card>
    </Form>
  )
}

export default JobRequirementsList;

function JobRequirementsItem({ requirement, reqRef }) {
  return (
    <Form.Group className="mb-3" controlId="formJobReq">
      <Form.Control as="textarea" rows={1}
        placeholder="Enter your Requirements" defaultValue={requirement.requirementText}
        ref={reqRef} />
    </Form.Group>
  )
}