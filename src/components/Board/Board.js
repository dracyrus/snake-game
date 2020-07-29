import React from "react";

import {PropTypes} from 'prop-types';

import Score from "../Score/Score";

import './Board.css';
import BoardMessage from "./BoardMessage/BoardMessage";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import BoardSquare from "./BoardSquare/BoardSquare";

const board = props => {
    let boardBox = null;

    if(!props.game.isStarted){
        boardBox = (
            <BoardMessage
                styleTemplateBoard={props.styleTemplate.board[1]}
                handleEvent={props.handleStartGame}
                message='Welcome to the Snake Game'/>
        );
    } else if(props.snake.isDead){
        boardBox = (
            <BoardMessage
                styleTemplateBoard={props.styleTemplate.board[1]}
                handleEvent={props.handleRestartGame}
                message='Game Over'/>
        );
    }

    return (
        <Auxiliary>
            {boardBox}
            <div className={props.styleTemplate.board.join(' ')}>
                <Score score={props.game.score}
                       foodColor={props.styleTemplate.color}
                       styleTemplateBoardSize={props.styleTemplate.board[1]}/>
                {props.boardSquare.map((element, index) => {
                    return <BoardSquare square={element} index={index}/>;
                })}
            </div>
        </Auxiliary>
    );
}

board.propTypes = {
    styleTemplate: PropTypes.shape({
        board: PropTypes.array.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        color : PropTypes.string.isRequired,
        squareOdd : PropTypes.string.isRequired,
        squareEven: PropTypes.string.isRequired,
    }).isRequired,
    boardSquare: PropTypes.array.isRequired,
    snake: PropTypes.shape({
        head: PropTypes.shape({
            row: PropTypes.number,
            column: PropTypes.number,
        }),
        tails: PropTypes.arrayOf(
            PropTypes.shape({
                row: PropTypes.number,
                column: PropTypes.number,
            })
        ),
        isDead: PropTypes.bool.isRequired,
    }).isRequired,
    game: PropTypes.shape({
        score: PropTypes.number.isRequired,
        isStarted: PropTypes.bool.isRequired,
    }).isRequired,
    handleStartGame: PropTypes.func.isRequired,
    handleRestartGame: PropTypes.func.isRequired,
}



export default board;