'use client'

import '../addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../../recruiterNavbar";
import JobDescription from "../jobDescription";
import JobRequirementsList from "../jobRequirements";
import { useParams, notFound } from "next/navigation";

function AddListing() {
  const nameRef = useRef();

  const [listing, setListing] = useState({requirements: []});

  //the param is postId
  const params = useParams()
  const listingId = params.postId

  useEffect(() => {
    fetch('/api/listingEdit/' + listingId)
      .then((response) => response.json())
      .then((data) => setListing(data));
  }, []);

  if (listing == undefined) {
    notFound();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/listingEdit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: listing.id
      }),
    })
  }

  const handleNameChange = (event) => {
    event.preventDefault();
    fetch('/api/listingEdit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: listing.id,
        name: nameRef.current.value
      }),
    })
  }

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
        <Form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Control as="textarea" rows={1} className="text-center" style={{ fontSize: '36px' }}
              defaultValue={listing.name} ref={nameRef} />
            <Button onClick={handleNameChange}>Save</Button>
          </div>
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
            <JobDescription listing={listing} />
            <JobRequirementsList id={listing.id} listing={listing} setListing={setListing} />
            <SavedBox/>
          </Card>
        </Form>
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