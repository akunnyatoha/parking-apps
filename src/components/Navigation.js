import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'


const Navigation = () => {
  return (
    <div>
        <Navbar bg="dark" className='navbar-dark' expand="lg">
        <Container>
            <Navbar.Brand href="#home" className='fs-4'>
                PARKING-APPS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link className='active' href="/">Home</Nav.Link>
                <Nav.Link className='active' href="/transaksi">Transaksi</Nav.Link>
                <Nav.Link className='active' href="/report">Report</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  )
}

export default Navigation