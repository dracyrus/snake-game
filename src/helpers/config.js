/**
 *
 * @param style
 * @returns {{backgroundColor: string, color: string, squareOdd: string, squareEven: string, board: [string]}}
 */
export const getSTyleTemplate = (style, boardSize) => {
    const board = ['board', 'board' + boardSize];
    let backgroundColor, color, squareOdd, squareEven;

    switch (style) {
        case 'blue':
            board.push('board-blue');
            backgroundColor = 'background-blue';
            color = 'color-blue';
            squareOdd = 'odd-blue';
            squareEven = 'even-blue';
            break;
        case 'purple':
            board.push('board-purple');
            backgroundColor = 'background-purple';
            color = 'color-purple';
            squareOdd = 'odd-purple';
            squareEven = 'even-purple';
            break;
        case 'pink':
            board.push('board-pink');
            backgroundColor = 'background-pink';
            color = 'color-pink';
            squareOdd = 'odd-pink';
            squareEven = 'even-pink';
            break;
        case 'green':
        default:
            board.push('board-green');
            backgroundColor = 'background-green';
            color = 'color-green';
            squareOdd = 'odd-green';
            squareEven = 'even-green';
            break;
    }

    const styleTemplate = {
        board,
        backgroundColor,
        color,
        squareOdd,
        squareEven,
    };

    return styleTemplate;
}

/**
 *
 * @param velocitySelected
 * @returns {number}
 */
export const getVelocity = (velocitySelected) => {
    let velocity;

    switch (velocitySelected) {
        case 'Medium':
            velocity = 200;
            break;
        case 'Hard':
            velocity = 50;
            break;
        case 'Easy':
        default:
            velocity = 350;
            break;
    }

    return velocity;
}

/**
 *
 * @param velocitySelected
 * @returns {number}
 */
export const getBoardSize = (boardSizeSelected) => {
    return {
        numberRow: boardSizeSelected,
        numberColumn: boardSizeSelected,
    }
}