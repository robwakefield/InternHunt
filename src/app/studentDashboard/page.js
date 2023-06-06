'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import "./studentDashboard.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import { Card, CarouselItem, ListGroupItem } from "react-bootstrap";
import { useEffect, useState, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function StudentDashboard() {

  const handleClick = () => {
    window.location.href = "./studentApplication";
  }

  return (
    <main className="studentDashboard">
      <Nav fill className="navbar" activeKey="/home">
        <Nav.Item>
          <h4>Dashboard</h4>
        </Nav.Item>
      </Nav>


      <Container fluid="md" className="dashboardContainer">
        <Row>
          <Col>
            <Container style={{ height: "80vh" }}>
              <Card className="mt-4 h-100">
                <Card.Header className="d-flex justify-content-between">
                  <Button>Sort</Button>
                  <h4>My Listings</h4>
                  <Button>New Post</Button>
                </Card.Header>

                <ListGroup>

                  <ListGroupItem>
                    <Container className="d-flex justify-content-between" style={{ cursor: "pointer" }} onClick={handleClick}>
                      <p className="text-center">IT Intern</p>
                    </Container>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Container className="d-flex justify-content-between" style={{ cursor: "pointer" }} onClick={handleClick}>
                    <p className="text-center">Softare Engineer Intern</p>
                    </Container>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Container className="d-flex justify-content-between" style={{ cursor: "pointer" }} onClick={handleClick}>
                      <p className="text-center">Management Intern</p>
                      <p></p>
                    </Container>
                  </ListGroupItem>

                </ListGroup>
              </Card>
            </Container>
          </Col>




          <Col xs={5} className="progressTimeline" ><VerticalTimeline style={{ height: "80vh" }} layout={{ default: '1-column-left'}}>
            <VerticalTimelineElement position="right"
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="10 Mar 2023"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            >
              <h3 className="vertical-timeline-element-title">Creative Director</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement  position="right"
              className="vertical-timeline-element--work"
              date="10 Mar 2023"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            >
              <h3 className="vertical-timeline-element-title">Art Director</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement position="right"
              iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            />
          </VerticalTimeline></Col>
        </Row>
      </Container>
    </main>
  );
}

export default StudentDashboard;
