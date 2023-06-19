'use client'
import { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "./applyPage.css"
import StudentNavbar from "../studentNavbar";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie"

function ApplyPage() {
    const cookies = new Cookies();
    const cookieStudentId = Number(cookies.get("studentID"));

    if (typeof window !== "undefined" && (!cookieStudentId || isNaN(cookieStudentId) || cookieStudentId == -1)) {
        window.location.replace("/login");
    }
    
    const [post, setPost] = useState({ name: "", description: "", requirements: [] });
    const [postId, setPostId] = useState(-1)
    const [studentId, setStudentId] = useState(cookieStudentId);
    const urlParams = useSearchParams();
    
    useEffect(() => {
        const queryPostID = parseInt(urlParams.get('postID'));
        if (isNaN(queryPostID)) {
            if (cookies.get("usedType") === "Student" && studentId != -1) {
                window.location.replace("/studentDashboard");
            } else {
                window.location.replace("/login");
            }
        }
        setPostId(queryPostID);
        setStudentId(studentId);

        fetch('/api/post/' + queryPostID)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setPost(data)
                } else {
                    window.location.replace("/login");
                }
            });
    }, []);

    const handleApply = () => {
        fetch("/api/createApplication", {
            method: "POST",
            body: JSON.stringify({
              studentID: studentId,
              postID: postId
            })
        }).then(() => {
            {typeof window !== "undefined" ? window.location.replace("/studentDashboard") : function () { }}
        })
    }
 
    return (
        <main className="applyPage">
            <StudentNavbar id={studentId} />
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