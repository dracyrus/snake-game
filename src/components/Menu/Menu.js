import React from "react";
import {connect} from "react-redux";
import {Navbar} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";

import './Menu.css';

const Menu = props => {
    let location = useLocation();
    const {styleTemplate} = props;

    let menuIcon = <FontAwesomeIcon icon={faCog}/>;
    let menuUrl  = '/configuration';

    if(location.pathname === '/configuration'){
        menuIcon = <FontAwesomeIcon icon={faArrowAltCircleLeft}/>;
        menuUrl  = '/';
    }

    return (
        <Navbar>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Link to={menuUrl} className={styleTemplate.color}>{menuIcon}</Link>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = state => {
    return {
        styleTemplate: state.config.styleTemplate,
    };
};

export default connect(mapStateToProps)(Menu);