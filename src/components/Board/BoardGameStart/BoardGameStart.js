import React from "react";

import './BoardGameOver.css';
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const boardGameStart = () => {
    return (
        <Auxiliary>
            <div className="boardGameOver text-center" />
            <h3 className='gameOverText text-center'>Game Over</h3>
        </Auxiliary>
    );
}

export default boardGameStart;