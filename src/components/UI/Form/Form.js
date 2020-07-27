import React from 'react';

import {Col, Row} from "react-bootstrap";

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import {getFormElementsArray} from '../../../helpers/';

import Input from '../Input/Input';
import Button from "../Button/Button";

import './Form.css';

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
                                    id={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    defaultValue={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    error={formElement.config.error}
                                    label={formElement.config.label}
                                    changed={event => props.handleInputChanged(event, formElement.id)}
                                    keypress={formElement.config.keypress}
                                    pasted={formElement.config.pasted}
                                    columnLabel={props.columnLabel}
                                    columnInput={props.columnInput}
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

export default form;

