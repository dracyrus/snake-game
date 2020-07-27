import * as actionTypes from './actionTypes';

/**
 *
 * @param boardSize
 * @param colorSnake
 * @param velocity
 * @returns {{levelVelocity: *, boardSize: *, type: string, colorSnake: *}}
 */
export const updateConfig = (boardSize, colorTemplate, velocity) => {
    return {
        type: actionTypes.UPDATE_CONFIG,
        boardSize: boardSize,
        colorTemplate: colorTemplate,
        levelVelocity: velocity,
    };
};
