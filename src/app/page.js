'use client'
import Image from 'next/image'
import styles from './page.module.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav';


export default function Home() {
  return (
    <main className={styles.main}>
          <Nav justify activeKey="/home">
          <Nav.Item><Nav.Link href="./studentDashboard">to studentDashboard</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="./recruiterDashboard">to recruiterDashboard</Nav.Link></Nav.Item>
          <Nav.Item>
          <h1>Intern Hunting</h1>
          </Nav.Item>
          </Nav>
    </main>
  )
}
