import React from "react";

import '../Board.css';

const boardGameStart = (props) => {
    return (
        <div onClick={props.handleStartGame}>
            <div className="boardGame text-center" />
            <h3 className='boardGameText text-center'>Welcome to the Snake Game</h3>
            <p className='boardGameTextInstruction text-center'>(Click inside to start)</p>
        </div>
    );
}

export default boardGameStart;