import {updateObject} from "./";

/**
 *
 * @param snake
 * @param board
 * @param score
 * @param updateSnake
 */
export const udpateSnakePosition = (snake, board, score, updateObjectState) => {
    const newPositionSnake = getNewPositionSnake(snake.head);
    const newPositionsSnakeTail = getNewPositionsSnakeTail(snake.head, snake.tails,board, score);
    const updatedElementHead = updateObject(snake.head, newPositionSnake);

    const isDead = validSnakeIsDead(board, newPositionSnake, newPositionsSnakeTail);

    const newSnake = {
        head: updatedElementHead,
        isDead: isDead,
        tails: newPositionsSnakeTail,
    }

    updateObjectState(newSnake, 'snake');
}

/**
 *
 * @param snakeHead
 * @param foodPosition
 * @returns {*|boolean|boolean}
 */
export const validSnakeEatFood = (snakeHead, foodPosition) => foodPosition && (snakeHead.row === foodPosition.row && snakeHead.column === foodPosition.column);


/**
 *
 */
export const addTailSnake = (snake, updateSnake) => {
    const tails = [...snake.tails];

    let lastPositionTail = (tails.length > 0) ? tails[tails.length-1] : snake.head;

    const newPositionTail = getNewPositionSnakeTail(snake.head, lastPositionTail);
    tails.push(newPositionTail);

    const newSnake = {
        tails,
    }

    updateSnake(newSnake);
}

/**
 *
 * @returns {{column: number, row: number}}
 */
const getNewPositionSnake = (snakeHead) => {
    const {direction, row, column} = snakeHead;

    switch (direction) {
        case 'up':
            return {row: row - 1, column: column}
        case 'down':
            return {row: row + 1, column: column}
        case 'left':
            return {row: row, column: column - 1}
        case 'right':
        default:
            return {row: row, column: column + 1}
    }
}

/**
 *
 * @param snakeHead
 * @param snakeTail
 * @returns {{column: number, row: number}|{column: *, row: number}}
 */
const getNewPositionSnakeTail = (snakeHead, snakeTail) => {
    switch (snakeHead.direction) {
        case 'up':
            return {row: snakeTail.row - 1, column: snakeTail.column}
        case 'down':
            return {row: snakeTail.row + 1, column: snakeTail.column}
        case 'left':
            return {row: snakeTail.row, column: snakeTail.column - 1}
        case 'right':
        default:
            return {row: snakeTail.row, column: snakeTail.column + 1}
    }
}

/**
 *
 * @param positionSnakeHead
 * @param tails
 * @param board
 * @param score
 * @returns {[]}
 */
const getNewPositionsSnakeTail = (positionSnakeHead, tails, board, score) => {
    let tailNewPosition = [];
    let newPositionTail, tailElementPosition = null;

    if(tails.length > 0){
        tails.map((element, index) => {
            newPositionTail = (index === 0) ? positionSnakeHead : tailElementPosition
            tailNewPosition.push(newPositionTail);
            tailElementPosition = element;
        });

        if((score/10) !== tails.length) tailNewPosition.push(tailElementPosition);
    }else if(score !== 0){
        tailNewPosition.push(positionSnakeHead);
    }

    return tailNewPosition;
}

/**
 *
 * @param boardSize
 * @param newPosition
 * @param newPositionsSnakeTail
 * @returns {boolean}
 */
const validSnakeIsDead = (boardSize, newPosition, newPositionsSnakeTail) => {
    if(
        newPosition.row >= boardSize.numberRow || newPosition.column >= boardSize.numberColumn ||
        newPosition.row < 0 || newPosition.column < 0 ||
        newPositionsSnakeTail.find(tail => tail.row === newPosition.row && tail.column === newPosition.column)
    )
        return true;

    return false;
}

