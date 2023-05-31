'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import Accordion from 'react-bootstrap/Accordion';

function BasicExample() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Language Skill</Accordion.Header>
        <Accordion.Body>
          I can speak english natively and achieved an A* at GCSE french
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Profient in Maths</Accordion.Header>
        <Accordion.Body>
          Maths Grade A in ALevels
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;