import React from 'react';

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

export default button;
