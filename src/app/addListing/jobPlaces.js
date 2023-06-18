'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";

function JobPlaces({ listing }) {
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
        totalPlaces: placeRef.current.value
      }),
    });
  }

  return (
    <Form>
      <Card className="mt-4 mb-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Job Places</p>
        <Button onClick={handleSubmit}>Save</Button>
        </Card.Header>
          <Form.Group className="mb-3" controlId="formJobPlaces">
            <Form.Control as="textarea" rows={1}
              placeholder="Change Job Places" defaultValue={listing.totalPlaces}
              ref={placeRef} />
          </Form.Group>
      </Card>
    </Form>
  )
}

export default JobPlaces;