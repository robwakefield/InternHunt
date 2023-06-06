'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import "./studentDashboard.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import { Card, CarouselItem, ListGroupItem } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function StudentDashboard() {

  const handleClick = () => {
    window.location.href = "./studentApplication";
  }

  return (
    <main className="studentDashboard">
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><img
              alt=""
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}InternHunt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


      <Container fluid="md" className="dashboardContainer">
        <Row>
          <Col>
            <Container style={{ height: "80vh" }}>
              <Card className="mt-4 h-100">
                <Card.Header className="d-flex justify-content-between">
                  <Button>Sort</Button>
                  <h4>My Applications</h4>
                  <Button>New Post</Button>
                </Card.Header>

                <ListGroup>

                  <ListGroupItem className="applicationEntry">
                    <Container fluid="md" style={{ cursor: "pointer" }} onClick={handleClick}>
                      <Row>
                        <Col><p className="text-left">IT Intern</p></Col>
                          <Col><p className="deadline"  style={{color:'darkgreen'}}>Deadline: 08/10/23</p></Col>
                          <Col><ProgressBar variant='success' now={50} /></Col>
                        </Row>
                    </Container>
                  </ListGroupItem>

                  <ListGroupItem className="applicationEntry">
                  <Container fluid="md" style={{ cursor: "pointer" }} onClick={handleClick}>
                      <Row>
                        <Col><p className="text-left">Softare Engineer Intern</p></Col>
                          <Col><p className="deadline" style={{color:'orange'}}>Deadline: 08/10/23</p></Col>
                          <Col><ProgressBar variant='warning' now={20} /></Col>
                        </Row>
                    </Container>
                  </ListGroupItem>

                  <ListGroupItem className="applicationEntry">
                  <Container fluid="md" style={{ cursor: "pointer" }} onClick={handleClick}>
                      <Row>
                        <Col><p className="text-left">Management Intern</p></Col>
                          <Col><p className="deadline" style={{color:'red'}} >Application Closed</p></Col>
                          <Col><ProgressBar variant='danger' now={100} /></Col>
                        </Row>
                    </Container>
                  </ListGroupItem>

                </ListGroup>
              </Card>
            </Container>
          </Col>




          <Col xs={5}><Container style={{ height: "80vh" }} ><Card className="mt-4 h-100 progressTimeline">
            <VerticalTimeline style={{ height: "80vh" }} layout={{ default: '1-column-left' }}>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              date="10 Mar 2023"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff'}}
            >
              <h6 className="vertical-timeline-element-title">Upload CV</h6>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="10 Mar 2023"
              iconStyle={{ background: 'grey', color: '#fff' }}
            >
              <h6 className="vertical-timeline-element-title">Applpication Submitted</h6>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="10 Mar 2023"
              iconStyle={{ background: 'grey', color: '#fff' }}
            >
              <h6 className="vertical-timeline-element-title">CV Viewed</h6>
              </VerticalTimelineElement>
              <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="10 Mar 2023"
              iconStyle={{ background: 'grey', color: '#fff' }}
            >
              <h6 className="vertical-timeline-element-title">Interview</h6>
              </VerticalTimelineElement>
              <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="10 Mar 2023"
              iconStyle={{ background: 'red', color: '#fff' }}
            >
                <h6 className="vertical-timeline-element-title">Applpication Unsuccessful <br></br>
                  <a className="feedback" href="./studentApplication">View Feedback</a> </h6>
            </VerticalTimelineElement>
          </VerticalTimeline></Card></Container></Col>
        </Row>
      </Container>
    </main>
  );
}

export default StudentDashboard;
