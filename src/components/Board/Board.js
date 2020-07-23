import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons";
import Score from "../Score/Score";

import './Board.css';

const board = props => {
    return (
        <div className="board">
            <Score score={props.score}/>
            {props.boardSquare.map((element, index) => {
                let color, snakeHead = null;

                if (element.isSnake) {
                    color = 'snake';
                    snakeHead = 'snake-head-' + props.direction;
                }
                else if (element.isTail) color = 'snake';
                else if (element.row % 2) color = (index % 2) ? 'even' : 'odd';
                else if (!(element.row % 2)) color = (index % 2) ? 'odd' : 'even';

                const food = (element.isFood) ? <FontAwesomeIcon icon={faAppleAlt} className='food'/> : null;

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

export default board;