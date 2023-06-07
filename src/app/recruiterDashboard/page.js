'use client'

import './recruiterDashboard.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, Button, ListGroup, Container, Navbar, Card, ListGroupItem } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import RecruiterNavbar from '../recruiterNavbar';
import '../globals.css'
import {BsSortDown} from 'react-icons/bs'

function RecruiterDashboard() {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);


  return (
    <main className="recruiterDashboard">
      <RecruiterNavbar></RecruiterNavbar>
      
      {/* Job Listings List */}
      <Container  style={{height: "80vh"}}>
        <Card className="mt-4 h-100">
          <Card.Header className="d-flex justify-content-between">
            <Button className="sortButton"><BsSortDown color="black" size={30}/></Button>
            <h4>My Listings</h4>
            <Button href="./addListing">New Post</Button>
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
    
    return (
      <ListGroupItem className="listing">
        <Container className="d-flex justify-content-between" style={{cursor: "pointer"}} onClick={handleClick}>
          <p className={status_class}>{this.state.status}</p>
          <p className="text-center">{this.state.title}</p>
          <p className={ratio_class}>
            {places_filled}/{total_places} Applications
          </p>
        </Container>
      </ListGroupItem>
    )
  }
}
