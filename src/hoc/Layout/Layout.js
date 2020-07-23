import React from 'react';
import {Container} from 'react-bootstrap';

import Menu from '../../components/UI/Menu/Menu';
import Carousel from '../../components/UI/Carousel/Carousel';
import Prices from '../../components/UI/Prices/Prices';
import Stepper from '../../components/UI/Stepper/Stepper';
import Exclusion from '../../components/Exclusion/Exclusion';

import Aux from '../Auxiliary/Auxiliary';

import './Layout.css';
import {connect} from "react-redux";

const layout = props => {
    return (
        <Aux>
            <Menu />
            <Container fluid={true} className="w-100 p-0 m-0">
                {/*SECTION SLIDER*/}
                <Carousel/>
                {/*PRICES SLIDER*/}
                <Prices />
                {/*SECTION STEPPER*/}
                <Stepper activeStep={1}/>
                {/*CONTENT*/}
                {props.children}
                {/*COBERTURAS*/}
                <Exclusion />
            </Container>
        </Aux>
    );
};

/**
 * Función que carga los state del Redux
 * @param state
 * @returns {{actualStep: *, isAuthenticated: boolean, loading: *, error: *}}
 */
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        actualStep: state.step.actualStep,
        redirectStep: state.step.redirectStep,
    };
};

export default connect(mapStateToProps)(layout);
