import React from "react"
import { Navbar, Nav } from "react-bootstrap";

export default function NavComponent(props) {
    return (
        <div className="nav_component">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Line Today</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {props.categories.map((category) => (
                            <Nav.Link key={category.name} href={"/category/" + category.name}>{category.name}</Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="/bookmarks">Bookmarks</Navbar.Brand>
            </Navbar>
        </div>
    )
}
