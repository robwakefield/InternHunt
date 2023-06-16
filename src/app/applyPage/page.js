'use client'
import { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "./applyPage.css"
import StudentNavbar from "../studentNavbar";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie"

function ApplyPage() {
    const [post, setPost] = useState({ name: "", description: "", requirements: [] });
    const [postId, setPostId] = useState(-1)
    const [studentId, setStudentId] = useState(-1);
    const [userID, setUserID] = useState(-1)
    const urlParams = useSearchParams();
    const cookies = new Cookies();
    
    useEffect(() => {
        const queryPostID = parseInt(urlParams.get('postID'));
        let queryStudentID = -1
        queryStudentID = parseInt(urlParams.get('studentID'));
        console.log(queryStudentID)
        if (isNaN(queryPostID)) {
            window.location.replace("/");
        }
        if (isNaN(queryStudentID)) {
            queryStudentID = Number(cookies.get("studentID"));
            window.location.replace("/applyPage?postID=" + queryPostID + "#" + queryStudentID);
        }
        if (isNaN(queryStudentID) || isNaN(queryPostID)) {
            window.location.replace("/login?postID=" + queryPostID);
        }
        setPostId(queryPostID);
        setStudentId(queryStudentID);

        fetch('/api/post/' + queryPostID)
            .then((response) => response.json())
            .then((data) => setPost(data));
    }, []);

    const handleApply = () => {
        //Redirect to LoginPage
        // if (userID == -1) {
        //     window.location.replace("/login")
        //     return
        // }
        fetch("/api/createApplication", {
            method: "POST",
            body: JSON.stringify({
              studentID: studentId,
              postID: postId
            })
        }).then(() => {
            window.location.replace("/studentDashboard?studentID=" + studentId)
        })
    }
 
    return (
        <main className="applyPage">
            <StudentNavbar/>
            <Card className="applyCard" style={{ margin: '3rem', width: '30rem' }}>
        
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