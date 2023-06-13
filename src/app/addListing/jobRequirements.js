'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobRequirementsList() {

  const [post, setPost] = useState({description: "", requirements: []});
  useEffect(() => {
    fetch('/api/listingEdit')
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    fetch('/api/requirements', {
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
        <p>Requirements</p>
        <Button onClick={handleAdd}>Add</Button>
        </Card.Header>
          {post.requirements.map((requirement) =>
            <JobRequirementsItem key={requirement.id} postid={post.id}
            id={requirement.id} requirement={requirement} setPost={setPost} />)}
      </Card>
    </Form>
  )
}

export default JobRequirementsList;

function JobRequirementsItem({ postid, id, requirement, setPost }) {
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

  const handleRemove = (event) => {
    event.preventDefault();
    fetch('/api/requirements', {
      method: 'DELETE',
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
          placeholder="Enter your Requirements" defaultValue={requirement.requirementText}
          ref={reqRef} />
          <ButtonGroup>
            <Button onClick={handleSubmit}>Save</Button>
            <Button onClick={handleRemove}>Remove</Button>
          </ButtonGroup>
      </div>
    </Form.Group>
  )
}