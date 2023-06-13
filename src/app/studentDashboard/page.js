'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import "./studentDashboard.css"
import { Card, Container, ListGroupItem, Row, Col, Button, ListGroup, ProgressBar } from "react-bootstrap";
import { Component, useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StudentNavbar from "../studentNavbar";
import { BsPen } from "react-icons/bs";

function StudentDashboard() {
  const [applications, setApplications] = useState([]);

  const selectedPostId = 1;
  const studentId = 1;

  useEffect(() => {
    fetch('/api/studentApplication/'+studentId)
      .then((response) => response.json())
      .then((data) => {console.log(data); setApplications(data)});
  }, []);

  return (
    <main className="studentDashboard">
      <StudentNavbar></StudentNavbar>

      <Container className="dashboardContainer">
        <Row>
          <Col>
            <Container style={{ height: "80vh" }}>
              <Card className="mt-4 h-100">
                <Card.Header className="d-flex justify-content-between">
                  <Button>Sort</Button>
                  <h4>My Applications</h4>
                  <Button>New Post</Button>
                </Card.Header>
                <ApplicationList applications={applications}/>
              </Card>
            </Container>
          </Col>
          <Col xs={5}>
            <Timeline applications={applications} selectedPostID={selectedPostId}/>
          </Col>

        </Row>
      </Container>
    </main>
  );
}

class ApplicationList extends Component {

  state = {
    applications: this.props.applications
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ 
        applications: this.props.applications
      });
    }
  }

  render() {
    return (
      <ListGroup>
        {this.state.applications.map((application) => {
          return <ApplicationListItem application={application} progress={80}/>
        })}
      </ListGroup>
    )
  }
}

class ApplicationListItem extends Component {

  state = {
    title: this.props.application.post.name,
    deadline: this.props.application.post.deadline.slice(0, 10).replace("-", "/").replace("-", "/"),
    progress: this.props.progress,
    postID: this.props.application.post.id,
    studentID: this.props.application.studentID
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ 
        title: this.props.application.post.name,
        deadline: this.props.application.post.deadline.slice(0, 10).replace("-", "/").replace("-", "/"),
        progress: this.props.progress,
        postID: this.props.application.post.id,
        studentID: this.props.application.studentID
      });
    }
  }

  editPost = () => {
    window.location.href = "./studentApplication?studentID=" + this.state.studentID + "&postID=" + this.state.postID;
  }

  statusColor() {
    const daysLeft = Math.ceil((Date.parse(this.state.deadline) - Date.now()) / (1000 * 60 * 60 * 24))
    console.log(daysLeft)
    if (daysLeft < 2) {
      return "danger"
    } else if (daysLeft < 7) {
      return "warning"
    } else {
      return "success"
    }
  }

  render() {
    return (
      <ListGroupItem className="applicationEntry">
        <Container className="d-flex justify-content-end">
          <p className="flex-fill text-left">{this.state.title}</p>
          <p className={"mx-4 deadline text-" + this.statusColor()}>{"Deadline " + this.state.deadline}</p>
          <ProgressBar variant={this.statusColor()} now={this.state.progress}/>
          <Button onClick={this.editPost}>
            <BsPen></BsPen>
          </Button>
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
