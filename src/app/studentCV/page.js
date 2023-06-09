'use client'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function StudentCV() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [urlParams, setUrlParams] = useState(null);
  useEffect(() => {
    setUrlParams(new URLSearchParams(window.location.search));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    const studentID = parseInt(urlParams.get('studentID'));
    const postID = parseInt(urlParams.get('postID'));
    if (isNaN(studentID) || isNaN(postID)) return;

    event.target.files[0].arrayBuffer().then((buffer) => {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  
      fetch('/api/cv', {
        method: 'PUT',
        body: JSON.stringify({
          studentID: studentID,
          postID: postID,
          cv: base64String
        })
      });
    });
  };

  return (
    <main className='studentCV'>
      <Form>
        <Form.Group controlId="file">
          <Form.Label>Upload CV: </Form.Label>
          <Form.Control type="file" size="lg" onChange={handleFileChange}/>
        </Form.Group>
      </Form>
    </main>
  );
}

export default StudentCV;