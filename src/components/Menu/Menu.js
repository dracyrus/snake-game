import React from "react";
import {PropTypes} from "prop-types";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";

import './Menu.css';


const menu = props => {
    let menuIcon = <FontAwesomeIcon icon={faCog}/>;
    let menuUrl  = '/configuration';

    if(props.pathname === '/configuration'){
        menuIcon = <FontAwesomeIcon icon={faArrowAltCircleLeft}/>;
        menuUrl  = '/';
    }

    return (
        <Navbar>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Link to={menuUrl} className={props.color}>{menuIcon}</Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

menu.propTypes = {
    color: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
}


export default menu;