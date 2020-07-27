import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";

import {connect} from "react-redux";
import * as actions from "../../store/actions";

import {updateObject} from "../../helpers/";
import Form from "../../components/UI/Form/Form";

import './Configuration.css';

const Configuration = props => {
    const {colorTemplate} = props;

    const levelVelocities = [
        { value: 'Easy', displayValue: 'Easy' },
        { value: 'Medium', displayValue: 'Medium' },
        { value: 'Hard', displayValue: 'Hard' },
    ];

    const colors = [
        { value: 'green', displayValue: 'green' },
        { value: 'blue', displayValue: 'blue' },
        { value: 'purple', displayValue: 'purple' },
        { value: 'pink', displayValue: 'pink' },
    ];

    const [configurationForm, setConfigurationForm] = useState({
        colorTemplate: {
            elementType: 'radio',
            elementConfig: {
                options: colors,
                name: 'colorSnake'
            },
            value: colorTemplate.color.replace('color-', ''),
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

    const configurationStyle = ['configuration', colorTemplate.board[1]]
    const styleTitle = ['mt-5', 'mb-5', colorTemplate.color]
    const classBtn = ['btn', 'mb-2', colorTemplate.backgroundColor];

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

        const board = ['board'];
        let backgroundColor, color, squareOdd, squareEven, velocity;

        switch (configurationForm.colorTemplate.value) {
            case 'blue':
                board.push('board-blue');
                backgroundColor = 'background-blue';
                color = 'color-blue';
                squareOdd = 'odd-blue';
                squareEven = 'even-blue';
                break;
            case 'purple':
                board.push('board-purple');
                backgroundColor = 'background-purple';
                color = 'color-purple';
                squareOdd = 'odd-purple';
                squareEven = 'even-purple';
                break;
            case 'pink':
                board.push('board-pink');
                backgroundColor = 'background-pink';
                color = 'color-pink';
                squareOdd = 'odd-pink';
                squareEven = 'even-pink';
                break;
            case 'green':
            default:
                board.push('board-green');
                backgroundColor = 'background-green';
                color = 'color-green';
                squareOdd = 'odd-green';
                squareEven = 'even-green';
                break;
        }

        switch (configurationForm.levelVelocity.value) {
            case 'Medium':
                velocity = 200;
                break;
            case 'Hard':
                velocity = 50;
                break;
            case 'Easy':
            default:
                velocity = 350;
                break;
        }

        const colorTemplae = {
            board,
            backgroundColor,
            color,
            squareOdd,
            squareEven,
        };

        const boardSize = {
            numberRow: 26,
            numberColumn: 26,
        };

        props.updateConfig(boardSize, colorTemplae, velocity);

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
        colorTemplate: state.config.colorTemplate,
    };
};

/**
 *
 * @param dispatch
 * @returns {{updateConfig: (function(*=, *=, *=): *)}}
 */
const mapDispatchToProps = dispatch => {
    return {
        updateConfig: (boardSize, colorTemplate, velocity) => dispatch(actions.updateConfig(boardSize, colorTemplate, velocity)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Configuration);

