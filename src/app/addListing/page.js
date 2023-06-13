'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";
import JobDescription from "./jobDescription";
import JobRequirementsList from "./jobRequirements";
import JobStagesList from "./jobStages";

function AddListing() {
  const [listing, setListing] = useState({});

  useEffect(() => {
    fetch('/api/listingEdit')
      .then((response) => response.json())
      .then((data) => setListing(data));
  }, []);

  return (
    <main className="addListing">
      <RecruiterNavbar/>
      <Container  style={{height: "80vh"}}>
      <Nav className="mt-2">
          <Pagination>
            <PageItem href="/recruiterDashboard">
              Back to Dashboard
            </PageItem>
          </Pagination>
        </Nav>
        <h1 className="text-center">{listing.name}</h1>
        {/* <Form onSubmit={handleSubmit}> */}
          <Card className="mt-4 h-100">
            <Card.Header className="d-flex justify-content-between">
              <Container className="d-flex justify-content-start">
                <FormCheck className="align-middle">
                  <FormCheck.Input/>
                  <FormCheck.Label>Ask for Cover Letter</FormCheck.Label>
                </FormCheck>
                <FormCheck className="mx-2">
                  <FormCheck.Input/>
                  <FormCheck.Label>Ask for Academic Results</FormCheck.Label>
                </FormCheck>
              </Container>
              <Button type='submit'>Publish</Button>
            </Card.Header>
            <JobStagesList listing={listing} />
            <JobDescription listing={listing} />
            <JobRequirementsList listing={listing} />
            <SavedBox/>
          </Card>
        {/* </Form> */}
      </Container>
    </main>
    
  );
}

export default AddListing;

class SavedBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Saved as Draft"
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({
        message: "Saved as Draft"
      });
    }
  }

  render() {
    return (
      <Container className="mt-2 d-flex justify-content-around">
        <Button className="btn-success">{this.state.message}</Button>
      </Container>
    )
  }
}