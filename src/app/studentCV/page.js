'use client'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function StudentCV() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <main className='studentCV'>
      <Form>
        <Form.Group controlId="file">
          <Form.Label>Upload CV: </Form.Label>
          <Form.Control type="file" size="lg" />
        </Form.Group>
      </Form>
    </main>
  );
}

export default StudentCV;