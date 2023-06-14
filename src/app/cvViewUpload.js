'use client'
import React, { useState } from 'react';

function CVViewUpload({ studentID, postID }) {
  const [base64String, setBase64String] = useState('');
  
  fetch("/api/cv", {
    method: "POST",
    body: JSON.stringify({
      requestType: "getCV",
      studentID: queryStudentID,
      postID: queryPostID
    })
  }).then((response) => response.json())
    .then((data) => { setBase64String(data.cv) });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    convertToBase64(file);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const buffer = reader.result;
      const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
      fetch("/api/cv", {
        method: "PUT",
        body: JSON.stringify({
          studentID: studentID,
          postID: postID,
          cv: base64String
        })
      });
      setBase64String(base64String);
    };

    reader.onerror = () => {
      console.error('Failed to read the file.');
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      {!base64String && (<input type="file" onChange={handleFileChange} />)}
      {base64String && (
        <embed
          src={`data:application/pdf;base64,${base64String}`}
          type="application/pdf"
          width="100%"
          height="1200px"
        />
      )}
    </div>
  );
}

export default CVViewUpload;
