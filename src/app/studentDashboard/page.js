'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const c = await prisma.student.count({})

  return {
    props : { c }
  }
}

function studentDashboard({c}) {
  return (
    <main className="studentDashboard">
      <h1>{c}</h1>
      <Nav fill className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <h6>3 Requirements Matched </h6>
        </Nav.Item>
        <Nav.Item>
        <h4>Your Application </h4>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Upload CV</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <Form>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Language Skill</Accordion.Header>
            <Accordion.Body>
            <Form.Group className="mb-3" controlId="formGroupSkill1">
              <Form.Control as="textarea" rows={3} placeholder="Enter your evidence of the skill"/>
            </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Profient in Maths</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3" controlId="formGroupSkill2">
                <Form.Label>Password</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your evidence of the skill"/>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>

      <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </main>
  );
}

export default studentDashboard;
