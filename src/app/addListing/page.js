'use client'

import './addListing.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Pagination, FormCheck, Nav, Button, PageItem, Container, Card, Form } from "react-bootstrap";
import { Component, useEffect, useRef, useState } from "react";
import RecruiterNavbar from "../recruiterNavbar";

function AddListing() {
  const descRef = useRef();
  const reqRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/listings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description : descRef.current.value,
        requirement : reqRef.current.value
      }),
    });
  }

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');

  const handleJobDescriptionChange = (description) => {
    setJobDescription(description);
  };
  
  const handleJobRequirementsChange = (requirements) => {
    setJobRequirements(requirements);
  };  

  return (
    <main className="addListing">
      <RecruiterNavbar/>
      <Container  style={{height: "80vh"}}>
      <Nav className="mt-2">
          <Pagination>
            <PageItem href="./recruiterDashboard">
              Back to Dashboard
            </PageItem>
          </Pagination>
        </Nav>
        <h1 className="text-center">IT Intern</h1>
        <Form onSubmit={handleSubmit}>
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
            <JobDescription listings={listings} descRef={descRef} onChange={handleJobDescriptionChange} />
            <JobRequirementsList listings={listings} reqRef={reqRef} onChange={handleJobRequirementsChange} />
            <SavedBox/>
          </Card>
        </Form>
      </Container>
    </main>
    
  );
}

export default AddListing;

class JobDescription extends Component {
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

  handleDescriptionChange = (event) => {
    const {onChange} = this.props;
    const description = event.target.value;
    onChange(description);
  };

  render() {
    const {listings, descRef} = this.props;
    return (
      <Card className="mt-4 mb-2 mx-3">
        <Card.Header className="d-flex justify-content-between">
        <p>Job Description</p>
        <Button>Edit</Button>
        </Card.Header>
        <Form.Group className="mb-3" controlId="formJobDesc">
          <Form.Control as="textarea" rows={3} placeholder="Enter your Job Description" ref={descRef} onChange={this.handleDescriptionChange}/>
        </Form.Group>
      </Card>
    )
  }
}

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