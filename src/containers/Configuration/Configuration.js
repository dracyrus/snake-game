import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";

import {connect} from "react-redux";
import * as actions from "../../store/actions";

import {updateObject, getSTyleTemplate, getVelocity, getBoardSize} from "../../helpers/";
import Form from "../../components/UI/Form/Form";

import './Configuration.css';

const Configuration = props => {
    const {styleTemplate} = props;

    const sizes = [
        { value: '26', displayValue: '26x26' },
        { value: '22', displayValue: '22x22' },
        { value: '18', displayValue: '18x18' },
    ];
    const colors = [
        { value: 'green', displayValue: 'green' },
        { value: 'blue', displayValue: 'blue' },
        { value: 'purple', displayValue: 'purple' },
        { value: 'pink', displayValue: 'pink' },
    ];
    const levelVelocities = [
        { value: 'Easy', displayValue: 'Easy' },
        { value: 'Medium', displayValue: 'Medium' },
        { value: 'Hard', displayValue: 'Hard' },
    ];

    const [configurationForm, setConfigurationForm] = useState({
        boardSize: {
            elementType: 'radio',
            elementConfig: {
                options: sizes,
                name: 'boardSize'
            },
            value: '26',
            validation: {
                required: true
            },
            valid: true,
            touched: false,
            keypress: null,
            pasted: null,
            label: 'Board Size',
            error: 'Define a Board Size'
        },
        colorTemplate: {
            elementType: 'radio',
            elementConfig: {
                options: colors,
                name: 'colorSnake'
            },
            value: styleTemplate.color.replace('color-', ''),
            validation: {
                required: true
            },
            valid: true,
            touched: false,
            keypress: null,
            pasted: null,
            label: 'Color Template',
            error: 'Define a Color for the Snake'
        },
        levelVelocity: {
            elementType: 'radio',
            elementConfig: {
                options: levelVelocities,
                name: 'levelVelocity'
            },
            value: 'Medium',
            validation: {
                required: true
            },
            valid: true,
            touched: false,
            keypress: null,
            pasted: null,
            label: 'Level',
            error: 'Define a Level'
        },
    });

    const configurationStyle = ['configuration', styleTemplate.board[2]]
    const styleTitle = ['mt-5', 'mb-5', styleTemplate.color]
    const classBtn = ['btn', 'mb-2', styleTemplate.backgroundColor];

    /**
     * Funcion que captura evento de cambio de valor de los Inputs
     * @param event
     * @param inputIdentifier
     * @param inputValue
     */
    const inputChangedHandler = (event, inputIdentifier) => {
        let value = event.target.value;

        const updatedFormElement = updateObject(configurationForm[inputIdentifier], {
            value: value,
        });

        const updatedOrderForm = updateObject(configurationForm, {
            [inputIdentifier]: updatedFormElement
        });

        updateForm(updatedOrderForm);
    };

    /**
     * Funcion que se ejecuta cuando se hace submit del formulario
     * @param event
     */
    const updateForm = updatedOrderForm => {
        setConfigurationForm(updatedOrderForm);
    };

    /**
     *
     * @param event
     */
    const formSubmitHandler = event => {
        event.preventDefault();

        const boardSize = getBoardSize(configurationForm.boardSize.value);
        const styleTemplate = getSTyleTemplate(configurationForm.colorTemplate.value, configurationForm.boardSize.value);
        const velocity = getVelocity(configurationForm.levelVelocity.value);

        console.log(boardSize);

        props.updateConfig(boardSize, styleTemplate, velocity);

    };

    return (
        <Row className='p-5 m-0 w-100'>
            <Col lg={12} className="text-center">
                <div className={configurationStyle.join(' ')}>
                    <h4 className={styleTitle.join(' ')}>Configurations</h4>
                    <Form
                        column='12'
                        columnLabel='6'
                        columnInput='6'
                        formData={configurationForm}
                        formIsValid={true}
                        handleInputChanged={inputChangedHandler}
                        handleFormSubmited={formSubmitHandler}
                        classBtn={classBtn}/>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = state => {
    return {
        styleTemplate: state.config.styleTemplate,
    };
};

/**
 *
 * @param dispatch
 * @returns {{updateConfig: (function(*=, *=, *=): *)}}
 */
const mapDispatchToProps = dispatch => {
    return {
        updateConfig: (boardSize, styleTemplate, velocity) => dispatch(actions.updateConfig(boardSize, styleTemplate, velocity)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Configuration);

