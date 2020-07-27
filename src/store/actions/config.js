import * as actionTypes from './actionTypes';

/**
 *
 * @param boardSize
 * @param colorSnake
 * @param velocity
 * @returns {{levelVelocity: *, boardSize: *, type: string, colorSnake: *}}
 */
export const updateConfig = (boardSize, styleTemplate, velocity) => {
    return {
        type: actionTypes.UPDATE_CONFIG,
        boardSize: boardSize,
        styleTemplate: styleTemplate,
        levelVelocity: velocity,
    };
};
