'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Component } from "react";

function RecruiterInternship() {
  return (
    <main className="recruiterInternship">
      <Button href="./recruiterDashboard">Return to Dashboard</Button>
      <ApplicantList />
      <SkillList />
    </main>
  );
}

export default RecruiterInternship;

class ApplicantList extends Component {
  applicants = [
    {name: "applicant1"},
    {name: "applicant2"},
    {name: "applicant3"}
  ];
  render() {
    return (
      <ListGroup componentClass="ul">{this.applicants.map((applicant) => (<ListGroupItem>{applicant.name}</ListGroupItem>))}</ListGroup>
    )
  }
}

class SkillList extends Component {
  skills = [
    {name: "skill1"},
    {name: "skill2"},
    {name: "skill3"}
  ];
  render() {
    return (
      <ListGroup componentClass="ul">{this.skills.map((skill) => (<ListGroupItem>{skill.name}</ListGroupItem>))}</ListGroup>
    )
  }
}
