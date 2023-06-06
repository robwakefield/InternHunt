'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, Button, ListGroup, Container, Navbar, Card, ListGroupItem } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import StudentNavbar from "../studentNavbar";

function RecruiterDashboard() {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);


  return (
    <main className="recruiterDashboard">
      <StudentNavbar/>
      
      {/* Job Listings List */}
      <Container  style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button>Sort</Button>
            <h4>My Listings</h4>
            <Button>New Post</Button>
          </Card.Header>
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

const handleClick = () => {
  window.location.href = "./recruiterInternship";
}

class ListingItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: this.props.post.name,
      status: this.props.post.status,
      places_filled: this.props.post.applications,
      total_places: this.props.post.totalPlaces
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({ 
        title: this.props.post.name,
        status: this.props.post.status,
        places_filled: this.props.post.applications,
        total_places: this.props.post.totalPlaces
      });
    }
  }

  render() {
    let status_text;
    switch (this.state.status) {
      case "Draft":
        status_text = <p className="text-muted">{this.state.status}</p>
        break
      case "Applications Open":
        status_text = <p className="text-success">{this.state.status}</p>
        break
      case "Applications Closed":
        status_text = <p className="text-error">{this.state.status}</p>
        break
      default:
        status_text = <p>{this.state.status}</p>
    }

    return (
      <ListGroupItem>
        <Container className="d-flex justify-content-between" style={{cursor: "pointer"}} onClick={handleClick}>
          {status_text}
          <p className="text-center">{this.state.title}</p>
          <p className="text-warning">
            {this.state.places_filled}/{this.state.total_places} Applications
          </p>
        </Container>
      </ListGroupItem>
    )
  }
}
