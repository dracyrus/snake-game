import React from 'react';
import {Container} from 'react-bootstrap';
import {useLocation} from "react-router-dom";

import Aux from '../Auxiliary/Auxiliary';
import Menu from "../../components/Menu/Menu";
import {connect} from "react-redux";

import './Layout.css';

const Layout = props => {
    const {styleTemplate} = props;
    const location = useLocation();

    return (
        <Aux>
            <Container fluid={true} className="w-100 p-0 m-0">
                <Menu
                    color={styleTemplate.color}
                    pathname={location.pathname}/>
                {props.children}
            </Container>
        </Aux>
    );
};


const mapStateToProps = state => {
    return {
        styleTemplate: state.config.styleTemplate,
    };
};

export default connect(mapStateToProps)(Layout);
