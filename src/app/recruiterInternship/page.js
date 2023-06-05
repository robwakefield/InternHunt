'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function RecruiterInternship() {
  const internshipName = "internshipName";
  const applicants = [
    {name: "applicant1"},
    {name: "applicant2"},
    {name: "applicant3"}
  ];

  return (
    <main className="recruiterInternship">
      <Button href="./recruiterDashboard">Return to Dashboard</Button>
      <Card>
        <Card.Header>{internshipName}</Card.Header>
        <Card.Body>
          <ListGroup componentClass="ul">{applicants.map((applicant) => (
            <ListGroupItem key={applicants.indexOf(applicant)}>{applicant.name}</ListGroupItem>))}
          </ListGroup>
        </Card.Body>
      </Card>
    </main>
  );
}

export default RecruiterInternship;
