import React from "react";
import {Navbar} from "react-bootstrap";

const menu = () => {
    return (
        <Navbar className='background-color-principal'>
            <Navbar.Brand href="#home">
                <h4 className='fuente-principal'>The Snake Game</h4>
            </Navbar.Brand>
        </Navbar>
    );
}

export default menu;