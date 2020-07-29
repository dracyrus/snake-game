import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons";

import {PropTypes} from 'prop-types';

import '../Board.css';

const board = props => {
    let color, snakeHead = null;

    if (props.square.isSnake) {
        color = props.styleTemplate.backgroundColor;
        snakeHead = 'snake-head-' + props.snake.head.direction;
    }
    else if (props.square.isTail) color = props.styleTemplate.backgroundColor;
    else if (props.square.row % 2) color = (props.index % 2) ? props.styleTemplate.squareEven : props.styleTemplate.squareOdd;
    else if (!(props.square.row % 2)) color = (props.index % 2) ? props.styleTemplate.squareOdd : props.styleTemplate.squareEven;

    const food = (props.square.isFood) ? <FontAwesomeIcon icon={faAppleAlt} className={props.styleTemplate.color}/> : null;

    let classes = [color, snakeHead];

    return (
        <div
            key={props.square.row + '-' + props.square.column}
            className={classes.join(' ')}>
            {food}
        </div>
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