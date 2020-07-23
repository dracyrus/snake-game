import React from "react";

import '../Board.css';

const boardGameOver = props => {
    return (
        <div onClick={props.handleRestartGame}>
            <div className="boardGame text-center" />
            <h3 className='boardGameText text-center'>Game Over</h3>
            <p className='boardGameTextInstruction text-center'>(Click inside to restart)</p>
        </div>
    );
}

export default boardGameOver;