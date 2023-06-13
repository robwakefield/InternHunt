'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobStagesList() {

  const [post, setPost] = useState({description: "", requirements: []});
  useEffect(() => {
    fetch('/api/stage')
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <Form>
      <Card className="my-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Requirements</p>
        <ButtonGroup>
          {/* <Button>Add</Button> */}
          {/* <Button>Remove</Button> */}
        </ButtonGroup>
        </Card.Header>
          {post.requirements.map((requirement) =>
            <JobRequirementsItem key={requirement.id} postid={post.id}
            id={requirement.id} requirement={requirement} />)}
      </Card>
    </Form>
  )
}

export default JobStagesList;

function JobStagesItem({ postid, id, requirement }) {
  const reqRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/requirements', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postid: postid,
        id: id,
        requirementText: reqRef.current.value
      }),
    });
  }

  return (
    <Form.Group className="mb-3" controlId="formJobReq">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Control as="textarea" rows={1}
          placeholder="Enter your Requirements" defaultValue={requirement.requirementText}
          ref={reqRef} />
          <Button onClick={handleSubmit}>Save</Button>
      </div>
    </Form.Group>
  )
}