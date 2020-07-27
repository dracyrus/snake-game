import React from "react";

import '../Board.css';
import {connect} from "react-redux";

const BoardMessage = props => {
    const {styleTemplate} = props;

    const boardGameStyle = ['boardGame', styleTemplate.board[1]];
    const boardGameMessageStyle = ['boardGameMessage', styleTemplate.board[1]];
    const boardGameTextInstructionsStyle = ['boardGameTextInstruction', styleTemplate.board[1]];

    return (
        <div onClick={props.handleEvent} className='text-center'>
            <div className={boardGameStyle.join(' ')} />
            <h3 className={boardGameMessageStyle.join(' ')}>{props.message}</h3>
            <p className={boardGameTextInstructionsStyle.join(' ')}>(Click inside to start)</p>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        styleTemplate: state.config.styleTemplate,
    };
};

export default connect(mapStateToProps)(BoardMessage);