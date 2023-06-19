'use client'

import "bootstrap/dist/css/bootstrap.min.css"
import {Nav, Navbar, Container, Button, Card, ListGroup,} from 'react-bootstrap/'
import LinkedInLogin from "./linkedInLogin"
import "./loginBackground.css"
import Cookies from "universal-cookie"


export default function Home() {
  const cookies = new Cookies();
  if (typeof window !== "undefined") {
    if (cookies.get("userType") === "Student" && cookies.get("studentID") != -1) {
      window.location.replace("/studentDashboard")
    } else if (cookies.get("userType") === "Recruiter" && cookies.get("recruiterID") != -1) {
      window.location.replace("/recruiterDashboard")
    } else {
      window.location.replace("/login")
    }
  }
  
  return (
    <main>
      <ul className="loginBackground">
                <li style={{borderColor: "blue"}}></li>
                <li style={{borderColor: "red"}}></li>
                <li style={{borderColor: "blue"}}></li>
                <li style={{borderColor: "blue"}}></li>
                <li style={{borderColor: "red"}}></li>
                <li style={{borderColor: "blue"}}></li>
                <li style={{borderColor: "blue"}}></li>
                <li style={{borderColor: "red"}}></li>
                <li style={{borderColor: "blue"}}></li>
                <li style={{borderColor: "red"}}></li>
                <li style={{borderColor: "red"}}></li>
            </ul>
    </main>
  )
}
