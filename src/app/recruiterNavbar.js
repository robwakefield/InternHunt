import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Background from './background';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function RecruiterNavbar(props) { 
  const [username, setUsername] = useState("");
  fetch('/api/getUser', {
    method: "POST",
    body: JSON.stringify({
      id: Number(props.id),
      userType: "Recruiter"
    })
}).then((response) => {
    if (response) {
        return response.json();
    } else {
        return response;
    }
})
.then((data) => {
    if (data) {
      setUsername(data.name)
    } else {
      setUsername("___")
    }
})

  return (
    <div>
    <Background user="recruiter"/>
    <Navbar className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="/"><img
          alt=""
          src="/favicon.ico"
          width="30"
          height="30"
          className="d-inline-block align-top"
          /> InternHunt</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {username}
          </Navbar.Text>
          <Button href="/login" style={{marginLeft: "10px"}} size="sm">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
      
    )
}

export default RecruiterNavbar;