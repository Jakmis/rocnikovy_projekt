import { Container, Nav, Navbar } from "react-bootstrap";
import Image from 'next/image'
import styles from "../styles/Nav.module.css";
import Link from "next/link";

export default function CustomNavbar(){
    return (
        <>
        <Navbar bg="dark" variant="light" className={styles.navbar} expand="lg">
          <Container>
            <Navbar.Brand>
              <Link href="/" className={styles.link}><Image
                alt=""
                src="/ghost-logo.png"
                width={30}
                height={30}
                className="d-inline-block align-top me-2"
              ></Image>
              D2 Companion</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item><Link href="/" className={styles.link}>Home</Link></Nav.Item>
              <Nav.Item><Link href="/data" className={styles.link}>Data</Link></Nav.Item>
            </Nav>
            <Nav>
            <Nav.Item><Link href="/playerView" className={styles.link}>Login</Link></Nav.Item>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
}