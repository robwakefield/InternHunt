'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobRequirementsList() {
  const [post, setPost] = useState({description: "", requirements: []});
  useEffect(() => {
    fetch('/api/listings')
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  const [isDisabled, setIsDisabled] = useState(true);

  const handleDisable = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <Card className="my-2 mx-3">
      <Card.Header className="d-flex justify-content-between">
      <p>Requirements</p>
      <ButtonGroup>
        {/* <Button>Add</Button> */}
        <Button onClick={handleDisable}>
        {isDisabled ? 'Edit' : 'Finish'}</Button>
        {/* <Button>Remove</Button> */}
      </ButtonGroup>
      </Card.Header>
      <Container className="px-4 py-3">
        {post.requirements.map((requirement) => <JobRequirementsItem requirement={requirement} isDisabled={isDisabled} />)}
      </Container>
    </Card>
  )
}

export default JobRequirementsList;

function JobRequirementsItem({ requirement, isDisabled }) {
  const reqRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/listings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requirementText : reqRef.current.value
      }),
    });
  }
  return (
    <Form.Group className="mb-3" controlId="formJobReq">
      <Form.Control as="textarea" rows={1}
        placeholder="Enter your Requirements" defaultValue={requirement.requirementText}
        ref={reqRef} onChange={handleSubmit} disabled={isDisabled} />
    </Form.Group>
  )
}