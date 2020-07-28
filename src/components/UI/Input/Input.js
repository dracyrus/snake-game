import React from 'react';

import './Input.css';
import {PropTypes} from "prop-types";

const input = ( props ) => {
    let inputElement = null;

    let classError = ['invalid-feedback'];
    if (props.inputConfig.invalid && props.inputConfig.touched) classError.push('showError');

    switch ( props.inputConfig.elementType ) {
        case ( 'textarea' ):
            inputElement = <textarea
                {...props.inputConfig.elementConfig}
                id={props.inputConfig.id}
                className="form-control"
                value={props.inputConfig.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    id={props.inputConfig.id}
                    value={props.inputConfig.value}
                    className="form-control"
                    onChange={props.changed}>
                    {props.inputConfig.elementConfig.options.map(option => (
                        <option key={option.value} value={props.inputConfig.elementConfig.name}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ( 'radio' ):
            inputElement = (
                <div>
                    {props.inputConfig.elementConfig.options.map((option, index) => {
                        const checked = (props.inputConfig.value === option.value) ? 'checked' : '';
                        return (<div className='form-check text-left mb-3' key={index}>
                                    <input type="radio"
                                           key={option.value}
                                           id={props.inputConfig.id}
                                           className="form-check-input"
                                           name={props.inputConfig.elementConfig.name}
                                           value={option.value}
                                           onChange={props.changed}
                                           checked={checked}/>
                            <label className='form-check-label'>{option.displayValue}</label>
                        </div>)
                    })}
                </div>
            );
            break;
        case ('input'):
        default:
            inputElement = <input
                {...props.inputConfig.elementConfig}
                id={props.inputConfig.id}
                className="form-control"
                value={props.inputConfig.value}
                onKeyPress={props.inputConfig.keypress}
                onChange={props.inputConfig.changed}
                onPaste={props.inputConfig.pasted}
                autoComplete='off'/>;
            break;
    }

    const arrClassLabel = ['col-sm-' + props.columnLabel, 'col-form-label', 'text-right'];
    const arrClassInput = ['col-sm-' + props.columnInput];

    if(parseInt(props.columnInput) === 7){
        classError.push('text-right');
        classError.push('mr-2');
    }

    const label = (props.inputConfig.label) ? <label className={arrClassLabel.join(' ')} htmlFor={props.inputConfig.id}>{props.inputConfig.label}</label> : null;

    return (
        <div className="form-group row">
            {label}
            <div className={arrClassInput.join(' ')}>
                {inputElement}
            </div>
            <div className={classError.join(' ')}>
                {props.inputConfig.error}
            </div>
        </div>
    );
};

input.propTypes = {
    inputConfig: PropTypes.object.isRequired,
    columnLabel: PropTypes.string.isRequired,
    columnInput: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
}

export default input;
