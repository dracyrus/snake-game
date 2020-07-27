import React from "react";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons";

import Score from "../Score/Score";

import './Board.css';
import BoardMessage from "./BoardMessage/BoardMessage";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

const Board = props => {
    const {styleTemplate} = props;

    let boardBox = null;

    if(!props.game.isStarted) boardBox = <BoardMessage handleEvent={props.handleStartGame} message='Welcome to the Snake Game'/>;
    else if(props.snake.isDead) boardBox = <BoardMessage handleEvent={props.handleRestartGame} message='Game Over'/>;

    return (
        <Auxiliary>
            {boardBox}
            <div className={styleTemplate.board.join(' ')}>
                <Score score={props.game.score} foodColor={styleTemplate.color}/>
                {props.boardSquare.map((element, index) => {
                    let color, snakeHead = null;

                    if (element.isSnake) {
                        color = styleTemplate.backgroundColor;
                        snakeHead = 'snake-head-' + props.snake.head.direction;
                    }
                    else if (element.isTail) color = styleTemplate.backgroundColor;
                    else if (element.row % 2) color = (index % 2) ? styleTemplate.squareEven : styleTemplate.squareOdd;
                    else if (!(element.row % 2)) color = (index % 2) ? styleTemplate.squareOdd : styleTemplate.squareEven;

                    const food = (element.isFood) ? <FontAwesomeIcon icon={faAppleAlt} className={styleTemplate.color}/> : null;

                    let classes = [color, snakeHead];

                    return (
                        <div
                            key={element.row + '-' + element.column}
                            className={classes.join(' ')}>
                            {food}
                        </div>
                    );
                })}
            </div>
        </Auxiliary>

    );
}

const mapStateToProps = state => {
    return {
        boardSize: state.config.boardSize,
        styleTemplate: state.config.styleTemplate,
        levelVelocity: state.config.levelVelocity,
    };
};

export default connect(mapStateToProps)(Board);