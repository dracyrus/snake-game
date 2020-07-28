import React from 'react';

import './Button.css';
import {PropTypes} from "prop-types";

const button = (props) => (
    <button
        type={props.typeBtn}
        id={props.idBtn}
        className={props.classBtn.join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}>
        {props.children}
    </button>
);

button.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    classBtn: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool.isRequired,
}

export default button;
