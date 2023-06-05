'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function RecruiterInternship() {
  const applicants = [
    {name: "applicant1"},
    {name: "applicant2"},
    {name: "applicant3"}
  ];

  return (
    <main className="recruiterInternship">
      <Button href="./recruiterDashboard">Return to Dashboard</Button>
      <ListGroup componentClass="ul">{applicants.map((applicant) => (<ListGroupItem>{applicant.name}</ListGroupItem>))}</ListGroup>
    </main>
  );
}

export default RecruiterInternship;
