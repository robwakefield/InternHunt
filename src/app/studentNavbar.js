import { Nav, Navbar, Image, Container } from 'react-bootstrap';
import Background from './background';

function StudentNavbar() { 
  return (
    <div>
    <Background user="student"/>
        <Navbar className="globalNavbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
              alt=""
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}InternHunt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/studentDashboard">Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      </div>
    )
}

export default StudentNavbar;