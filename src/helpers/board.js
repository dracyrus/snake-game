import {validSnakeEatFood, addTailSnake, updateObject} from "./";

/**
 * Function that update the board with the snake and food position
 */
export const updateBoard = (boardSize, board, snake, score, updateStateElements) => {
    const boardSquards = [];

    const isEatFood = validSnakeEatFood(snake.head, board.foodPosition);

    let actualScore = score;
    if(isEatFood){
        actualScore  += 10;
        addTailSnake(snake, updateStateElements);
    }

    const newFoodPosition   = (!board.foodPosition || isEatFood) ? updateFoodPosition(boardSize) : board.foodPosition;
    let row, column = 0;

    for (row = 0; row < boardSize.numberRow; row++) {
        for (column = 0; column < boardSize.numberColumn; column++) {

            const isSnake = (snake.head.row === row && snake.head.column === column);
            const isFood  = (newFoodPosition.row === row && newFoodPosition.column === column);
            const isTail  = (snake.tails.find(tail => tail.row === row && tail.column === column));

            boardSquards.push({
                row,
                column,
                isSnake,
                isFood,
                isTail
            })
        }
    }

    const updatedBoard = updateObject(board, {
        boardSquare: boardSquards,
        foodPosition: newFoodPosition,
    });

    const updateScore = {score: actualScore};

    updateStateElements(updatedBoard, 'board');
    updateStateElements(updateScore, 'game');
}

/**
 * Function that update food position
 * @returns {{column: number, row: number}}
 */
const updateFoodPosition = (boardSize) => {
    return {
        row: Math.floor(Math.random() * (boardSize.numberRow - 1)) + 1,
        column: Math.floor(Math.random() * (boardSize.numberColumn - 1)) + 1,
    };
}