'use client'
import { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "./applyPage.css"
import StudentNavbar from "../studentNavbar";

function ApplyPage() {
    const [post, setPost] = useState({ name: "", description: "", requirements: [] });
    const [postId, setPostId] = useState(-1)
    const [studentId, setStudentId] = useState(-1);
    const [userID, setUserID] = useState(-1)
  
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryPostID = parseInt(urlParams.get('postID'));
        const queryStudentID = parseInt(urlParams.get('studentID'));
    
        if (isNaN(queryStudentID) || isNaN(queryPostID)) window.location.replace("/login");
        setPostId(queryPostID);
        setStudentId(queryStudentID);

        fetch('/api/post/' + queryPostID)
            .then((response) => response.json())
            .then((data) => setPost(data));
        
        
        
    }, []);

    if (post == undefined) {
        notFound();
    }

    const handleApply = () => {
        //Redirect to LoginPage
        if (userID == -1) {
            window.location.replace("/login")
        }
        fetch("/api/createApplication", {
            method: "POST",
            body: JSON.stringify({
              studentID: studentId,
              postID: postId
            })
        })

        window.location.replace("/studentDashboard")
    }

    return (
        <main className="applyPage">
            <StudentNavbar/>
            <Card className="applyCard" style={{ margin: '12rem', width: '30rem' }}>
        
                <Card.Header>
                    Welcome to Intern Hunt
                </Card.Header>
                <Card.Body>
                    <Card.Title>{post.name}</Card.Title>
                        <strong>Description:</strong>
                        <p>{post.description}</p>
                        <strong>Requirements:</strong>
                        {post.requirements.map((requirement,index) =>
                            (<p key={index}>- {requirement.requirementText}</p>))}
                    <Button onClick={handleApply}> Apply now </Button>
                </Card.Body>
            </Card>

        </main>);

}

export default ApplyPage;