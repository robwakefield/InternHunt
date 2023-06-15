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
  const handleExit = () => {window.location.href = "/recruiterDashboard"};

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
      .then(handleExit)
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
        totalPlaces: listing.totalPlaces,
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
      .then(handleExit)
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
        <Nav className="mt-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Pagination>
            <PageItem href="/recruiterDashboard">
              Back to Dashboard
            </PageItem>
          </Pagination>
          {modal}
          <Pagination>
            <ButtonGroup>
              <Button type='submit' onClick={handleSubmit}>Publish</Button>
              <Button variant="danger" onClick={handleShow}>Remove</Button>
            </ButtonGroup>
          </Pagination>
        </Nav>
        <Card>
        <Card.Header>
          <Form style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Control as="textarea" rows={2} className="text-center" style={{ fontSize: '32px' }}
              defaultValue={listing.name} ref={nameRef} />
            <Button onClick={handleNameChange}>Save</Button>
          </Form>
        </Card.Header>
          <JobPlaces listing={listing} />
          <JobDescription listing={listing} />
          <JobRequirementsList id={listing.id} listing={listing} setListing={setListing} />
          <SavedBox/>
        </Card>
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