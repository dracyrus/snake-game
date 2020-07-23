import React from 'react';
import {Container} from 'react-bootstrap';

import Aux from '../Auxiliary/Auxiliary';

import './Layout.css';

const layout = props => {
    return (
        <Aux>
            <Container fluid={true} className="w-100 p-0 m-0">
                {props.children}
            </Container>
        </Aux>
    );
};


export default layout;
