import React from 'react';
import {Container} from 'react-bootstrap';

import Aux from '../Auxiliary/Auxiliary';

import './Layout.css';
import Menu from "../../components/Menu/Menu";

const layout = props => {
    return (
        <Aux>
            <Container fluid={true} className="w-100 p-0 m-0">
                <Menu />
                {props.children}
            </Container>
        </Aux>
    );
};


export default layout;
