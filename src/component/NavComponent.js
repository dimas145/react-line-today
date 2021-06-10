import React, { useState, useEffect } from 'react'
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";

function NavComponent() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("/portaljson").then(res => {
            setCategories(res.data.result.categoryList);
        });
    }, []);

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="home">Line Today</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {categories.map((category) => (
                            <Nav.Link key={category.name} href={category.name}>{category.name}</Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavComponent;