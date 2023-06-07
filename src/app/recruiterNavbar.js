import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function RecruiterNavbar() { 
    return (
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
      </Container>
    </Navbar>
    )
}

export default RecruiterNavbar;