import React from "react";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons";

import Score from "../Score/Score";

import './Board.css';

const Board = props => {
    const {colorTemplate} = props;

    return (
        <div className={colorTemplate.board.join(' ')}>
            <Score score={props.score} foodColor={colorTemplate.color}/>
            {props.boardSquare.map((element, index) => {
                let color, snakeHead = null;

                if (element.isSnake) {
                    color = colorTemplate.backgroundColor;
                    snakeHead = 'snake-head-' + props.direction;
                }
                else if (element.isTail) color = colorTemplate.backgroundColor;
                else if (element.row % 2) color = (index % 2) ? colorTemplate.squareEven : colorTemplate.squareOdd;
                else if (!(element.row % 2)) color = (index % 2) ? colorTemplate.squareOdd : colorTemplate.squareEven;

                const food = (element.isFood) ? <FontAwesomeIcon icon={faAppleAlt} className={colorTemplate.color}/> : null;

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
    );
}

const mapStateToProps = state => {
    return {
        boardSize: state.config.boardSize,
        colorTemplate: state.config.colorTemplate,
        levelVelocity: state.config.levelVelocity,
    };
};

export default connect(mapStateToProps)(Board);