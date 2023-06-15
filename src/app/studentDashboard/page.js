'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import "./studentDashboard.css"
import { Card, Container, ListGroupItem, Row, Col, Button, ListGroup, ProgressBar } from "react-bootstrap";
import { Component, useEffect, useState, useRef } from "react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StudentNavbar from "../studentNavbar";
import { BsPen } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai"
import "../globals.css"

function useInterval(callback, delay) {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

function StudentDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState();

  const studentId = 1;

  useEffect(() => {
    fetch('/api/studentApplication/' + studentId)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data)
        setSelectedApplication(data ? data.length > 0 ? data[0] : null : null)
      });
  }, []);

  useInterval(() => {
    fetch('/api/studentApplication/'+studentId)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data)
        setSelectedApplication(data[applications.findIndex(app => app.postID == selectedApplication.postID)])
      });
  }, 4000); // x second interval

  return (
    <main className="studentDashboard">
      <StudentNavbar></StudentNavbar>

      <Container className="dashboardContainer">
        <Row>
          <Col>
            <Container style={{ height: "80vh" }}>
              <Card className="mt-4 h-100">
                <Card.Header className="d-flex justify-content-center">
                  <h4>My Applications</h4>
                </Card.Header>
                <ApplicationList applications={applications} setSelectedApplication={setSelectedApplication} selectedApplication={selectedApplication}/>
              </Card>
            </Container>
          </Col>
          <Col xs={4}>
            <Timeline application={selectedApplication}/>
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
          return <ApplicationListItem
            application={application}
            progress={
              (application.accepted || application.rejected) ? 100 :
              application.stages.length == 0 ? 0 :
                (application.stages.filter((stage) => {
                  return stage.completed
                }).length / application.stages.length) * 100
            } 
            selected={this.props.selectedApplication == application} 
            setSelectedApplication={this.props.setSelectedApplication} 
            key={application.postID}/>
        })}
      </ListGroup>
    )
  }
}

class ApplicationListItem extends Component {

  state = {
    title: this.props.application.post.name,
    deadline: this.formatDate(this.props.application.post.deadline),
    progress: this.props.progress,
    postID: this.props.application.post.id,
    studentID: this.props.application.studentID
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ 
        title: this.props.application.post.name,
        deadline: this.formatDate(this.props.application.post.deadline),
        progress: this.props.progress,
        postID: this.props.application.post.id,
        studentID: this.props.application.studentID
      });
    }
  }

  formatDate(strDate) {
    const date = new Date(strDate)
    return date.toString().slice(8, 10) + " " + date.toString().slice(4, 7) + " " + date.toString().slice(11, 15)
  }

  editPost = () => {
    window.location.href = "./studentApplication?studentID=" + this.state.studentID + "&postID=" + this.state.postID;
  }

  statusColor() {
    const daysLeft = Math.ceil((Date.parse(this.state.deadline) - Date.now()) / (1000 * 60 * 60 * 24))
    if (daysLeft < 2) {
      return "danger"
    } else if (daysLeft < 7) {
      return "warning"
    } else {
      return "success"
    }
  }

  progressbarColor() {
    const application = this.props.application;
    const progress = this.state.progress 
    return application.accepted ? "success" : 
            application.rejected ? "danger" :
            progress >= 50 ?  "primary":
            "warning"
  }

  render() {
    return (
      <ListGroupItem className={this.props.selected ? "selectedApplicationEntry" : "applicationEntry"} onClick={() => {this.props.setSelectedApplication(this.props.application)}} key={this.state.postID.toString() + "s" + this.state.studentID}>
        <Container className="d-flex">
          <Container className="d-flex justify-content-end">
            <p className="w-25 text-left flex-fill my-2">{this.state.title}</p>
            <p className={"w-25 text-left mx-4 my-2 text-" + (this.props.application.submitted ? "muted" : this.statusColor())}>{this.props.application.submitted ? "Submitted" : "Deadline " + this.state.deadline}</p>
          </Container>
          <Container className="w-50 d-flex justify-content-end align-bottom">
            <ProgressBar className="w-auto mx-2" variant={this.progressbarColor()} now={this.state.progress}/>
            <div>
              <Button onClick={this.editPost} className="my-2">
                {this.props.application.submitted ? <AiOutlineEye style={{ color: 'white'}} /> : <BsPen/>}
              </Button>
            </div>
          </Container>
        </Container>
      </ListGroupItem>
    )
  }
}

class Timeline extends Component {

  state = {
    stages: this.props.application ? this.props.application.stages : [],
    interview: this.props.application ? this.props.application.interview : null,
    rejected: this.props.application ? this.props.application.rejected : false,
    accepted: this.props.application ? this.props.application.accepted : false,
    postID: this.props.application ? this.props.application.postID : null,
    studentID: this.props.application ? this.props.application.studentID : null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ 
        stages: this.props.application ? this.props.application.stages : [],
        interview: this.props.application ? this.props.application.interview : null,
        rejected: this.props.application ? this.props.application.rejected : false,
        accepted: this.props.application ? this.props.application.accepted : false,
        postID: this.props.application ? this.props.application.postID : null,
        studentID: this.props.application ? this.props.application.studentID : null,
      });
    }
  }

  formatDate(strDate) {
    const date = new Date(strDate)
    return date.toString().slice(8, 10) + " " + date.toString().slice(4, 7) + " " + date.toString().slice(11, 15) + " " + date.toString().slice(15, 21)
  }
  
  isCurrentStage(stage) {
    if (this.state.rejected || this.state.accepted) {
      return false
    }
    const stageIndex = this.state.stages.findIndex(s => s == stage)
    if (stage.completed) {
      if (stageIndex == this.state.stages.length - 1) {
        return true
      } else {
        const currentStageIndex = this.state.stages.map((s) => {return s.completed}).findIndex(b => b == false)
        return currentStageIndex == stageIndex + 1
      }
    }
    return false
  }

  render() {
    let feedback = this.state.rejected ? this.renderRejectedElement() : this.state.accepted ? this.renderAcceptedElement() : null
    if (this.state.interview && Date.parse(this.state.interview.date) - Date.now() < 0) {
      // Interview date has passed
      this.setState({ interview: {
        date: this.state.interview.date,
        location: this.state.interview.location,
        description: this.state.interview.description,
        completed: true
      } })
    }
    return (
      <Container style={{ height: "80vh" }} >
        <Card className="mt-4 h-100 progressTimeline">
          <VerticalTimeline style={{ height: "80vh" }} layout={{ default: '1-column-left' }}>
            {this.state.stages.filter(
              // filter out incomplete stages if the application is already finished
              stage => stage.completed || (!stage.completed && !this.state.rejected && !this.state.accepted)
              ).map((stage) => {
                if (this.state.interview && stage.stageText == "Interview") {
                  return this.renderInterview(stage)
                }
                return <VerticalTimelineElement key={stage.stageText}
                  className="vertical-timeline-element--work"
                  contentStyle={this.isCurrentStage(stage) ? { background: 'rgb(33, 150, 243)', color: '#fff' } : {}}
                  date={stage.date ? this.formatDate(stage.date) : ""}
                  iconStyle={{ background: stage.completed || this.isCurrentStage(stage) ? 'rgb(33, 150, 243)' : 'grey', color: '#fff' }}
                >
                  <h6 className="vertical-timeline-element-title">{stage.stageText}</h6>
                </VerticalTimelineElement>
            })}
            {feedback}
          </VerticalTimeline>
        </Card>
      </Container>
    )
  }

  renderInterview(stage) {
    return  <VerticalTimelineElement key={stage}
              className="vertical-timeline-element--work"
              contentStyle={this.isCurrentStage(stage) ? { background: 'rgb(33, 150, 243)', color: '#fff' } : {}}
              date={this.state.interview ? this.formatDate(this.state.interview.date) : ""}
              iconStyle={{ background: (this.state.interview && this.state.interview.completed) || this.isCurrentStage(stage) ? 'rgb(33, 150, 243)' : 'grey', color: '#fff' }}
            >
              <h6 className="vertical-timeline-element-title">{stage.stageText}</h6>
              <h6 className="feedback">{this.state.interview.location} <br/></h6>
              <h6 className="feedback">{this.state.interview.description}</h6>
            </VerticalTimelineElement>
  }

  renderRejectedElement() {
    return <VerticalTimelineElement key={"rejected-element"}
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        date="" //TODO add rejected date
        iconStyle={{ background: 'red', color: '#fff' }}
      >
      <h6 className="vertical-timeline-element-title">Application Unsuccessful <br></br>
      <a className="feedback text-white" href={"./studentViewFeedback/" + this.state.studentID +'/' + this.state.postID}>View Feedback</a> </h6>
      </VerticalTimelineElement>
  }

  renderAcceptedElement() {
    return <VerticalTimelineElement key={"accepted-element"}
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        date="" //TODO add accepted date
        iconStyle={{ background: 'green', color: '#fff' }}
      >
      <h6 className="vertical-timeline-element-title">Application Successful</h6>
      </VerticalTimelineElement>
  }
}

export default StudentDashboard;
