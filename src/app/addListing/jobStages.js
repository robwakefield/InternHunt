'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobStagesList() {

  const [application, setApplication] = useState({stages: []});
  useEffect(() => {
    fetch('/api/stages')
      .then((response) => response.json())
      .then((data) => setApplication(data));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    fetch('/api/stages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postID: post.id
      }),
    })
      .then((response) => response.json())
      .then((newRequirement) => {
        setPost((prevPost) => ({
          ...prevPost,
          requirements: [...prevPost.requirements, newRequirement]
        }));
      });
  }

  return (
    <Form>
      <Card className="my-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Stages</p>
        <Button onClick={handleAdd}>Add</Button>
        </Card.Header>
          {application.stages.sort((a, b) => a.id - b.id).map((stage) =>
            <JobStagesItem key={stage.id} postid={stage.postID}
            id={stage.id} stage={stage} setPost={setPost} />)}
      </Card>
    </Form>
  )
}

export default JobStagesList;

function JobStagesItem({ postid, id, stage }) {
  const reqRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/stages', {
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

  const handleRemove = (event) => {
    event.preventDefault();
    fetch('/api/stageRemoval', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postid: postid,
        id: id
      }),
    })
      .then((response) => response.clone())
      .then(() => {
        setPost((prevPost) => ({
          ...prevPost,
          requirements: prevPost.requirements.filter((requirement) => requirement.id !== id)
        }));
      });
  }

  return (
    <Form.Group className="mb-3" controlId="formJobReq">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Control as="textarea" rows={1}
          placeholder="Enter your Stages" defaultValue={stage.stageText}
          ref={reqRef} />
          <ButtonGroup>
            <Button onClick={handleSubmit}>Save</Button>
            <Button onClick={handleRemove}>Remove</Button>
          </ButtonGroup>
      </div>
    </Form.Group>
  )
}