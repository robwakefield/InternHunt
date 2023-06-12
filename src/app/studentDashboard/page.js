'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import "./studentDashboard.css"
import { Card, Container, ListGroupItem, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StudentNavbar from "../studentNavbar";

function StudentDashboard() {
  const selectedPostId = 1;
  const studentId = 1;

  const handleClick = () => {
    window.location.href = "./studentApplication?studentID=1&postID=1";
  }

  return (
    <main className="studentDashboard">
      <StudentNavbar></StudentNavbar>

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
                <ApplicationList/>
              </Card>
            </Container>
          </Col>
          <Col xs={5}>
            <Timeline/>
          </Col>

        </Row>
      </Container>
    </main>
  );
}

class ApplicationList extends Component {
  render() {
    return (
      <ListGroup>
        <ApplicationListItem title="Software Engineer Intern" status="Applications Open" progress="70"/>
        <ApplicationListItem title="Software Engineer Intern" status="Applications Closed" progress="90"/>
        <ApplicationListItem title="Software Engineer Intern" status="Draft" progress="20"/>
      </ListGroup>
    )
  }
}

class ApplicationListItem extends Component {

  state = {
    title: this.props.title,
    status: this.props.status,
    progress: this.props.progress
  }

  handleClick = () => {
    window.location.href = "./studentApplication?studentID=1&postID=1";
  }

  statusColor() {
    if (this.props.status == "Applications Open") {
      return "success"
    } else if (this.props.status == "Applications Closed") {
      return "danger"
    } else if (this.props.status == "Draft") {
      return "muted"
    }
  }

  render() {
    return (
      <ListGroupItem className="applicationEntry">
        <Container fluid="md" style={{ cursor: "pointer" }} onClick={this.handleClick}>
          <Row>
            <Col><p className="text-left">{this.state.title}</p></Col>
            <Col><p className={"deadline text-" + this.statusColor()}>{this.state.status}</p></Col>
            <Col><ProgressBar variant={this.statusColor()} now={this.state.progress}/></Col>
          </Row>
        </Container>
      </ListGroupItem>
    )
  }
}

class Timeline extends Component {

  state = {
    studentID: 1,
    selectedPostID: 1
  }

  render() {
    return (
      <Container style={{ height: "80vh" }} >
        <Card className="mt-4 h-100 progressTimeline">
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
            <h6 className="vertical-timeline-element-title">Application Submitted</h6>
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
              <h6 className="vertical-timeline-element-title">Application Unsuccessful <br></br>
              <a className="feedback" href={"./studentViewFeedback/" + this.state.studentID +'/' + this.state.selectedPostID}>View Feedback</a> </h6>
          </VerticalTimelineElement>
        </VerticalTimeline>
        </Card>
      </Container>
    )
  }
}

export default StudentDashboard;
