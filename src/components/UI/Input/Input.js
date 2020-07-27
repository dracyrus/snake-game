import React from 'react';

import './Input.css';

const input = ( props ) => {
    let inputElement = null;

    let classError = ['invalid-feedback'];
    if (props.invalid && props.touched) classError.push('showError');

    switch ( props.elementType ) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                id={props.id}
                className="form-control"
                value={props.value}
                onKeyPress={props.keypress}
                onChange={props.changed}
                onPaste={props.pasted}
                autoComplete='off'/>;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                {...props.elementConfig}
                id={props.id}
                className="form-control"
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    id={props.id}
                    value={props.value}
                    className="form-control"
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={props.elementConfig.name}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ( 'radio' ):
            inputElement = (
                <div>
                    {props.elementConfig.options.map((option, index) => {
                        const checked = (props.value === option.value) ? 'checked' : '';
                        return (<div className='form-check text-left mb-3' key={index}>
                                    <input type="radio"
                                           key={option.value}
                                           id={props.id}
                                           className="form-check-input"
                                           name={props.elementConfig.name}
                                           value={option.value}
                                           onChange={props.changed}
                                           checked={checked}/>
                            <label className='form-check-label'>{option.displayValue}</label>
                        </div>)
                    })}
                </div>
            );
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                id={props.id}
                className="form-control"
                value={props.value}
                onKeyPress={props.keypress}
                onChange={props.changed}
                onPaste={(e) => {e.preventDefault();}}
                autoComplete='off'/>;
            break;
    }

    const arrClassLabel = ['col-sm-' + props.columnLabel, 'col-form-label', 'text-right'];
    const arrClassInput = ['col-sm-' + props.columnInput];

    if(parseInt(props.columnInput) === 7){
        classError.push('text-right');
        classError.push('mr-2');
    }

    const label = (props.label) ? <label className={arrClassLabel.join(' ')} htmlFor={props.id}>{props.label}</label> : null;

    return (
        <div className="form-group row">
            {label}
            <div className={arrClassInput.join(' ')}>
                {inputElement}
            </div>
            <div className={classError.join(' ')}>
                {props.error}
            </div>
        </div>
    );

};

export default input;
