import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helpers/';

const initialState = {
    boardSize:{
        numberRow: 26,
        numberColumn: 26,
    },
    styleTemplate: {
        board: ['board','board26', 'board-green'],
        backgroundColor: 'background-green',
        color : 'color-green',
        squareOdd : 'odd-green',
        squareEven: 'even-green',
    },
    levelVelocity: 200,
};

/**
 *
 * @param state
 * @param action
 */
const updateConfig = (state, action) => {
    return updateObject( state, {
        boardSize:action.boardSize,
        styleTemplate: action.styleTemplate,
        levelVelocity: action.levelVelocity,
        loading: false,
        error: null
    } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_CONFIG: return updateConfig(state, action);
        default:
            return state;
    }
};

export default reducer;
