'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";

function JobRequirementsList({ listing, setListing }) {

  const handleAdd = (event) => {
    event.preventDefault();
    fetch('/api/requirements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postID: listing.id
      }),
    })
      .then((response) => response.json())
      .then((newRequirement) => {
        setListing((prevListing) => ({
          ...prevListing,
          requirements: [...prevListing.requirements, newRequirement]
        }));
      });
  }

  return (
    <Form>
      <Card className="mt-4 mb-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Requirements</p>
        <Button onClick={handleAdd}>Add</Button>
        </Card.Header>
          {listing.requirements.sort((a, b) => a.id - b.id).map((requirement) =>
            <JobRequirementsItem key={requirement.id} listingId={listing.id}
            requirement={requirement} reqID={requirement.id} setListing={setListing} />)}
      </Card>
    </Form>
  )
}

export default JobRequirementsList;

function JobRequirementsItem({ listingId, requirement, reqID, setListing }) {
  const reqRef = useRef();

  const handleSubmit = () => {
    fetch('/api/requirements', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postid: listingId,
        id: requirement.id,
        requirementText: reqRef.current.value
      }),
    });
  }

  const handleRemove = (event) => {
    event.preventDefault();
    fetch('/api/requirementRemoval', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postid: listingId,
        id: requirement.id
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setListing((prevListing) => ({
          ...prevListing,
          requirements: prevListing.requirements.filter((requirement) => requirement.id !== reqID)
        }));
      });
  }

  return (
    <Form.Group className="mb-3" controlId="formJobReq">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Control as="textarea" rows={1}
          placeholder="Enter your Requirements" defaultValue={requirement.requirementText}
          ref={reqRef} onChange={handleSubmit} />
          <ButtonGroup>
            <Button variant="danger" onClick={handleRemove}>Remove</Button>
          </ButtonGroup>
      </div>
    </Form.Group>
  )
}