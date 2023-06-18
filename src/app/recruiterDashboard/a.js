'use client'

import './recruiterDashboard.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, ListGroup, Container, Card, ListGroupItem, Modal, Form, Row, Col } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from '../recruiterNavbar';
import '../globals.css'
import {BsSortDown} from 'react-icons/bs'

function RecruiterDashboard() {
  const titleRef = useRef();
  const placesRef = useRef();

  const [listings, setListings] = useState([]);
  const [showJobListing, setJobListing] = useState(false);

  const handleClose = () => setJobListing(false);
  const handleShow = () => setJobListing(true);

  useEffect(() => {
    fetch('/api/listings')
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    fetch('/api/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: titleRef.current.value,
        // totalPlaces: parseInt(placesRef.current.value)
      }),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
  }

  return (
    <main className="recruiterDashboard">
      <RecruiterNavbar id={recruiterId}/>
      
      {/* Job Listings List */console.log(listings)}
      <Container  style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Form>
            <Card.Header className="d-flex justify-content-between">
              <p className="w-25"></p>
              <h4 className="w-50 text-center">My Listings</h4>

              <Modal show={showJobListing} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>New Listing</Modal.Title>
                </Modal.Header>
                  <Modal.Body>
                    <strong>Title</strong>
                    <Form.Group className="mb-3" controlId="formJob">
                      <Form.Control as="textarea" rows={1} type="text"
                        placeholder="Enter your Job Title" ref={titleRef} />
                      <strong>Places</strong>
                      <Form.Control as="textarea" rows={1} type="number"
                        placeholder="Enter your Job Places" ref={placesRef} />
                    </Form.Group>
                  </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleAdd}>
                    Create Listing
                  </Button>
                </Modal.Footer>
              </Modal>

              <Container className="w-25 d-flex">
                <p className="flex-fill"></p>
                <Button onClick={handleShow}>New Listing</Button>
              </Container>
            </Card.Header>
          </Form>  
          <ApplicantList listings={listings}/>
        </Card>
      </Container>
    </main>
    
  );
}

export default RecruiterDashboard;

class ApplicantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: props.listings
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({ listings: this.props.listings });
    }
  }

  render() {
    return (
      <ListGroup>
        {this.state.listings.sort((a, b) => a.id - b.id)
          .map((listing) => <ListingItem key={listing.title} post={listing}></ListingItem>)}
      </ListGroup>
    )
  }
}

const handleClick = (postId) => {
  window.location.href = "/viewApplicants/" + postId;
}

const handleEdit = (postId, event) => {
  event.stopPropagation();
  window.location.href = "/addListing/" + postId;
}

class ListingItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: this.props.post.id,
      title: this.props.post.name,
      status: this.props.post.status,
      applications: this.props.post.applications,
      // total_places: this.props.post.totalPlaces
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({ 
        id: this.props.post.id,
        title: this.props.post.name,
        status: this.props.post.status,
        applications: this.props.post.applications,
        // total_places: this.props.post.totalPlaces
      });
    }
  }

  getStatusClass(status) {
    switch (status) {
      case "Draft":
        return "text-muted"
      case "Applications Open":
        return "text-success"
      case "Applications Closed":
        return "text-danger"
      default:
        return ""
    }
  }

  // getRatioClass(ratio) {
  //   if (ratio >= 0.8) {
  //     return "text-success"
  //   } else if (ratio >= 0.4) {
  //     return "text-warning"
  //   } else if (ratio > 0){
  //     return "text-danger"
  //   } else {
  //     return ""
  //   }
  // }

  render() {
    
    let status_class = this.getStatusClass(this.state.status)

    let places_filled = 0
    if (this.state.applications) {
      places_filled = this.state.applications.length
    }
    // let total_places = this.state.total_places
    // let ratio = places_filled / total_places
    
    // let ratio_class = this.getRatioClass(ratio)

    // let rhs = <p className={ratio_class}>{places_filled}/{total_places} Applications</p>
    let rhs = <p className="text-right">{places_filled} Applications</p>
    if (this.state.status == "Draft") {
      rhs = <Container className="w-25 d-flex">
              <p className="flex-fill"></p>
              <Button 
                onClick={(event) => {handleEdit(this.state.id, event)}}
              >Click to Edit</Button>
            </Container>
    }
    
    let tab = 
      <Container className="d-flex justify-content-between" style={{cursor: "pointer"}} onClick={() => {handleClick(this.state.id)}}>
        <Row style={{width: "100%"}}>
            <Col xs={4}><p className={status_class}><strong>{this.state.status}</strong></p></Col>
            <Col xs={5}><p className="text-left"><strong>{this.state.title}</strong></p></Col>
            <Col style={{textAlignLast: "right"}} xs={3}>{rhs}</Col>
        </Row>
      </Container>
    
    if (this.state.status == "Draft") {
      tab =
        <Container className="d-flex justify-content-between">
          <Row style={{width: "100%"}}>
            <Col><p className={status_class}>{this.state.status}</p></Col>
            <Col><p className="text-left"><strong>{this.state.title}</strong></p></Col>
            <Col style={{textAlignLast: "end"}}>{rhs}</Col>
          </Row>
        </Container>
    }
    
    return (
      <ListGroupItem className="listing">
        {tab}
      </ListGroupItem>
    )
  }
}
