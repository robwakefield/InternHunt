'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

class JobRequirementsList extends Component {
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

  render() {
    const {listings, reqRef, onChange} = this.props;
    return (
      <Card className="my-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Requirements</p>
        <Button>Edit</Button>
        </Card.Header>
        <Container className="px-4 py-3">
          <JobRequirementsItem listings={listings} reqRef={reqRef} onChange={onChange}/>
          <JobRequirementsItem listings={listings} reqRef={reqRef} onChange={onChange}/>
          <JobRequirementsItem listings={listings} reqRef={reqRef} onChange={onChange}/>
        </Container>
      </Card>
    )
  }
}

export default JobRequirementsList;

class JobRequirementsItem extends Component {
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

  handleRequirementChange = (event) => {
    const {onChange} = this.props;
    const requirement = event.target.value;
    this.setState({ requirement });
    onChange(requirement);
  };

  render() {
    const {listings, reqRef} = this.props;
    let requirement = "- " + this.state.requirement
    return (
      <Form.Group className="mb-3" controlId="formJobReq">
        <Form.Control as="textarea" rows={1} placeholder="Enter your Requirements" ref={reqRef} onChange={this.handleRequirementChange}/>
      </Form.Group>
    )
  }
}