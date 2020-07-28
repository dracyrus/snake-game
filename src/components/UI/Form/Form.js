import React from 'react';

import {Col, Row} from "react-bootstrap";

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import {getFormElementsArray} from '../../../helpers/';

import Input from '../Input/Input';
import Button from "../Button/Button";

import './Form.css';
import {PropTypes} from "prop-types";

const form = props => {
    const formElementsArray = getFormElementsArray(props.formData);

    return (
        <Auxiliary>
            <form onSubmit={props.handleFormSubmited}>
                <Row className="w-100 mt-4 rowForm">
                    {formElementsArray.map((formElement, index) => {
                        return (
                            <Col lg={props.column} className='form-group' key={formElement.id}>
                                <Input
                                    key={formElement.id}
                                    inputConfig={formElement.config}
                                    columnLabel={props.columnLabel}
                                    columnInput={props.columnInput}
                                    changed={event => props.handleInputChanged(event, formElement.id)}
                                />
                            </Col>
                        )
                    })}
                </Row>
                <Row className='w-100 mt-4'>
                    <Col lg={12} className="text-center">
                        <Button
                            type="submit"
                            id="btnEnviar"
                            classBtn={props.classBtn}
                            disabled={!props.formIsValid}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </form>
        </Auxiliary>
    );
};

form.propTypes = {
    column: PropTypes.string.isRequired,
    columnLabel: PropTypes.string.isRequired,
    columnInput: PropTypes.string.isRequired,
    formData: PropTypes.object.isRequired,
    formIsValid: PropTypes.bool.isRequired,
    handleInputChanged: PropTypes.func.isRequired,
    handleFormSubmited: PropTypes.func.isRequired,
    classBtn: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default form;

