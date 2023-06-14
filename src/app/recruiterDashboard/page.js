'use client'

import './recruiterDashboard.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, ListGroup, Container, Card, ListGroupItem, Modal, Form } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import RecruiterNavbar from '../recruiterNavbar';
import '../globals.css'
import {BsSortDown} from 'react-icons/bs'

function RecruiterDashboard() {

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
        
      }),
    })
  }

  return (
    <main className="recruiterDashboard">
      <RecruiterNavbar></RecruiterNavbar>
      
      {/* Job Listings List */}
      <Container  style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Form>
            <Card.Header className="d-flex justify-content-between">
              <Button className="sortButton"><BsSortDown color="black" size={30}/></Button>
              <h4>My Listings</h4>

              <Modal show={showJobListing} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>New Listing</Modal.Title>
                </Modal.Header>
                  <Modal.Body>
                    <strong>Title</strong><br></br>Form<br></br>
                    <strong>Places</strong><br></br>Form<br></br>
                  </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" type='submit'>
                    Create Listing
                  </Button>
                </Modal.Footer>
              </Modal>

              <Button onClick={handleShow}>New Listing</Button>
              {/* href="./addListing" */}
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
        {this.state.listings.map((listing) => <ListingItem key={listing.title} post={listing}></ListingItem>)}
      </ListGroup>
    )
  }
}

const handleClick = (postId) => {
  window.location.href = "/viewApplicants/" + postId;
}

class ListingItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: this.props.post.id,
      title: this.props.post.name,
      status: this.props.post.status,
      places_filled: this.props.post.applications,
      total_places: this.props.post.totalPlaces
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({ 
        id: this.props.post.id,
        title: this.props.post.name,
        status: this.props.post.status,
        places_filled: this.props.post.applications,
        total_places: this.props.post.totalPlaces
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

  getRatioClass(ratio) {
    if (ratio >= 0.8) {
      return "text-success"
    } else if (ratio >= 0.4) {
      return "text-warning"
    } else if (ratio > 0){
      return "text-danger"
    } else {
      return ""
    }
  }

  render() {
    
    let status_class = this.getStatusClass(this.state.status)

    let places_filled = 0
    if (this.state.places_filled) {
      places_filled = this.state.places_filled.length
    }
    let total_places = this.state.total_places
    let ratio = places_filled / total_places
    
    let ratio_class = this.getRatioClass(ratio)

    let rhs = <p className={ratio_class}>{places_filled}/{total_places} Applications</p>
    if (this.state.status == "Draft") {
      rhs = <Button href="./addListing">Click to Edit</Button>
    }
    
    return (
      <ListGroupItem className="listing">
        <Container className="d-flex justify-content-between" style={{cursor: "pointer"}} onClick={() => {handleClick(this.state.id)}}>
          <p className={status_class}>{this.state.status}</p>
          <p className="text-center">{this.state.title}</p>
          {rhs}
        </Container>
      </ListGroupItem>
    )
  }
}
