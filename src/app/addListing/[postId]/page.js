'use client'

import '../addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form, Modal, ButtonGroup } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../../recruiterNavbar";
import JobDescription from "../jobDescription";
import JobRequirementsList from "../jobRequirements";
import { useParams, notFound } from "next/navigation";
import JobPlaces from '../jobPlaces';

function AddListing() {
  const nameRef = useRef();

  const [listing, setListing] = useState({requirements: []});
  const [showRemove, setRemove] = useState(false);

  const handleClose = () => setRemove(false);
  const handleShow = () => setRemove(true);

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

  const handleRemove = (event) => {
    event.preventDefault();
    fetch('/api/listingRemoval', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: listing.id
      }),
    })
      .then(() => {window.location.href = "/recruiterDashboard"})
  }

  let modal = <Modal show={showRemove} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Remove Listing?</Modal.Title>
    </Modal.Header>
      <Modal.Body className="text-center">
        <strong>This CANNOT be undone!</strong>
      </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleRemove}>
        Remove
      </Button>
    </Modal.Footer>
  </Modal>

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
              {modal}
              <ButtonGroup>
                <Button type='submit'>Publish</Button>
                <Button variant="danger" onClick={handleShow}>Remove</Button>
              </ButtonGroup>
            </Card.Header>
            <JobPlaces listing={listing} />
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