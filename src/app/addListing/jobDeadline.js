'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function JobDeadline({ listing }) {
  const placeRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/listingEdit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: listing.id,
        deadline: event.target.value
      }),
    });
  }

  return (
    <Form>
      <Card className="mt-4 mb-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
          <p>Deadline Date / Time</p>
          <Button onClick={handleSubmit}>Save</Button>
        </Card.Header>
          <input type="datetime-local" defaultValue={listing.deadline}
            onChange={handleSubmit}
          />
      </Card>
    </Form>
  )
}

export default JobDeadline;