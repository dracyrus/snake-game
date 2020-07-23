import React from "react";
import {Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDrumstickBite} from "@fortawesome/free-solid-svg-icons";

const board = props => {
    return (
        <div className="board">
            {props.boardSquare.map((element, index) => {
                let color;
                let food = null;
                let snakeHead = null;

                if (element.isSnake) {
                    color = 'snake';
                    snakeHead = 'snake-head-' + props.direction;
                } else if (element.row % 2) color = (index % 2) ? 'even' : 'odd';
                else if (!(element.row % 2)) color = (index % 2) ? 'odd' : 'even';

                if (element.row === board.foodPosition.row && element.column === board.foodPosition.column)
                    food = <FontAwesomeIcon icon={faDrumstickBite} className='food'/>;

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