import React from "react";
import {PropTypes} from "prop-types";

import '../Board.css';

const boardMessage = props => {

    const boardGameStyle = ['boardGame', props.styleTemplateBoard];
    const boardGameMessageStyle = ['boardGameMessage', props.styleTemplateBoard];
    const boardGameTextInstructionsStyle = ['boardGameTextInstruction', props.styleTemplateBoard];

    return (
        <div onClick={props.handleEvent} className='text-center'>
            <div className={boardGameStyle.join(' ')} />
            <h3 className={boardGameMessageStyle.join(' ')}>{props.message}</h3>
            <p className={boardGameTextInstructionsStyle.join(' ')}>(Click inside to start)</p>
        </div>
    );
}

boardMessage.propTypes = {
    styleTemplateBoard: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    handleEvent: PropTypes.func.isRequired,
}

export default boardMessage;