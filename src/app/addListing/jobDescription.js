'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

class JobDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: props.listings
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({
        listings: this.props.listings
      });
    }
  }

  handleDescriptionChange = (event) => {
    const {onChange} = this.props;
    const description = event.target.value;
    onChange(description);
  };

  render() {
    const {listings, descRef} = this.props;
    return (
      <Card className="mt-4 mb-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Job Description</p>
        <Button>Edit</Button>
        </Card.Header>
        <Form.Group className="mb-3" controlId="formJobDesc">
          <Form.Control as="textarea" rows={3} placeholder="Enter your Job Description" ref={descRef} onChange={this.handleDescriptionChange}/>
        </Form.Group>
      </Card>
    )
  }
}

export default JobDescription;