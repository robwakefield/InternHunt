'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { FormText, FormCheck, Nav, Button, ListGroup, Container, Navbar, Card, ListGroupItem, Form } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import StudentNavbar from "../studentNavbar";

function AddListing() {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);


  return (
    <main className="addListing">
      <StudentNavbar/>
      
      <Container  style={{height: "80vh"}}>
        <h1 className="text-center mt-4">IT Intern</h1>
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
            <Button>Publish</Button>
          </Card.Header>
          <JobDescription/>    
          <JobRequirementsList/>
          <SavedBox/>   
        </Card>
      </Container>
    </main>
    
  );
}

export default AddListing;

class JobDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "Bowtie’s mission is to make insurance good again and our vision is to build a category-defining health insurance company.\nAs a young and fast-growing company, grooming and learning from the next generation is always our priority. We are looking for interns to join us throughout the year - as a Bowtie intern, you will be treated and work like the rest of the team (no fetching coffee duties), and gain experience in substantive marketing or growth projects.\nWe also offer return offers for high achievers who share our values!"
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({
        description: "Bowtie’s mission is to make insurance good again and our vision is to build a category-defining health insurance company.\nAs a young and fast-growing company, grooming and learning from the next generation is always our priority. We are looking for interns to join us throughout the year - as a Bowtie intern, you will be treated and work like the rest of the team (no fetching coffee duties), and gain experience in substantive marketing or growth projects.\nWe also offer return offers for high achievers who share our values!"
      });
    }
  }

  render() {
    return (
      <Card className="mt-4 mb-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Job Description</p>
        <Button>Edit</Button>
        </Card.Header>
        <Container className="px-4 py-3">
          {this.state.description.split("\n").map((para) => {return <p>{para}</p>})}
        </Container>
      </Card>
    )
  }
}

class JobRequirementsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "Bowtie’s mission is to make insurance good again and our vision is to build a category-defining health insurance company.\nAs a young and fast-growing company, grooming and learning from the next generation is always our priority. We are looking for interns to join us throughout the year - as a Bowtie intern, you will be treated and work like the rest of the team (no fetching coffee duties), and gain experience in substantive marketing or growth projects.\nWe also offer return offers for high achievers who share our values!"
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({
        description: "Bowtie’s mission is to make insurance good again and our vision is to build a category-defining health insurance company.\nAs a young and fast-growing company, grooming and learning from the next generation is always our priority. We are looking for interns to join us throughout the year - as a Bowtie intern, you will be treated and work like the rest of the team (no fetching coffee duties), and gain experience in substantive marketing or growth projects.\nWe also offer return offers for high achievers who share our values!"
      });
    }
  }

  render() {
    return (
      <Card className="my-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Requirements</p>
        <Button>Edit</Button>
        </Card.Header>
        <Container className="px-4 py-3">
          <JobRequirementsItem/>
          <JobRequirementsItem/>
          <JobRequirementsItem/>
        </Container>
      </Card>
    )
  }
}

class JobRequirementsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requirement: "Hold a bachelor's degree or above, with graduation expected in 2023"
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({
        requirement: "Hold a bachelor's degree or above, with graduation expected in 2023"
      });
    }
  }

  render() {
    let requirement = "- " + this.state.requirement
    return (
      <Container className="px-0 py-0">
        {<p>{requirement}</p>}
      </Container>
    )
  }
}

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