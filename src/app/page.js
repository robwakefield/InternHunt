'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import {Nav, Navbar, Container, Button} from 'react-bootstrap/'
import LinkedInLogin from "./linkedInLogin"


export default function Home() {
  return (
    <main>
      {/* Navigation Title Bar */}
      <Navbar bg="light" expand="lg">
        <Container className="d-flex justify-content-end">
          <Button className="mx-1">Sign up</Button>
          <Button className="mx-1">Log in</Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1 className="text-center display-1">Intern Hunting</h1>
        <Container className="my-2 w-50">
          <p className="text-center">
            Enabling students and companies to communicate more effectively when
             offering internships, making it a less time-consuming process while
             offering clearer details on available positions and providing
             feedback to applicants.
          </p>
        </Container>

        <Container className="my-5 d-flex justify-content-center">
          <Button className="mx-4" href="./studentDashboard">Student Dashboard</Button>
          <Button className="mx-4" href="./recruiterDashboard">Recruiter Dashboard</Button>
        </Container>
      </Container>

      <LinkedInLogin />
    </main>
  )
}
