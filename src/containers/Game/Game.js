import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";

import {connect} from "react-redux";

import {updateObject, useInterval, updateBoard, udpateSnakePosition} from "../../helpers/";

import Board from "../../components/Board/Board";

import './Game.css';

const Game = props => {
    const {boardSize, levelVelocity} = props;
    const initialBoard = {
        boardSquare: [],
        foodPosition: null,
    }
    const initialSnake = {
        head: {
            row: parseInt(boardSize.numberRow / 2),
            column: parseInt(boardSize.numberColumn / 2),
            direction: 'right'
        },
        tails: [],
        isDead: false,
    };
    const initialGame = {
        score: 0,
        isStarted: false,
    }
    /*************** STATE DECLARATION ***************/
    const [board, setBoard] = useState(initialBoard);
    const [snake, setSnake] = useState(initialSnake);
    const [game, setGame] = useState(initialGame);

    /**
     * Function update the Board
     */
    useEffect(() => {
        updateBoard(boardSize, board, snake, game.score, updateStateElements);
    }, []);

    /**
     * Function that execute every specific time until snake is dead
     */
    useInterval(() => {
        udpateSnakePosition(snake, boardSize, game.score, updateStateElements);
    }, game.isStarted && !snake.isDead ? levelVelocity : null);

    /**
     * Function update Snake when the Position changes
     */
    useEffect(() => {
        if (!snake.isDead) {
            updateBoard(boardSize, board, snake, game.score, updateStateElements);
            document.body.addEventListener('keydown', udpateSnakeDirection);
        }

        return () => document.body.removeEventListener('keydown', udpateSnakeDirection);
    }, [snake.head.row, snake.head.column]);

    /**
     * Function start the game
     */
    const handleStartGame = () => {
        const updateElement = {
            score: 0,
            isStarted: true,
        };

        updateStateElements(updateElement, 'game');
    }

    /**
     * Function reload the game
     */
    const handleRestartGame = () => {
        updateStateElements(initialSnake, 'snake');
        updateStateElements(initialGame, 'game');
        updateStateElements(initialBoard, 'board');
    };

    /**
     *
     * @param updateElement
     * @param type
     */
    const updateStateElements = (updateElement ,type) => {
        let updatedElements;

        switch (type) {
            case 'board':
                updatedElements = updateObject(board, updateElement);
                setBoard(updatedElements);
                break;
            case 'game':
                updatedElements = updateObject(game, updateElement);
                setGame(updatedElements);
                break;
            case 'snake':
                updatedElements = updateObject(snake, updateElement);
                setSnake(updatedElements);
                break;
        }
    }

    /**
     * Function that update snake direction
     * @param e
     */
    const udpateSnakeDirection = event => {
        let direction;

        switch (event.keyCode) {
            case 37:
                direction = 'left';
                break;
            case 38:
                direction = 'up';
                break;
            case 39:
                direction = 'right';
                break;
            case 40:
                direction = 'down';
                break;
            default:
                event.preventDefault();
                return;
        }

        const updatedElement = updateObject(snake.head, {direction: direction});
        updateStateElements({head: updatedElement}, 'snake');
    }

    return (
        <Row className='p-5 m-0 w-100'>
            <Col lg={12} className="text-center">
                <Board
                    boardSquare={board.boardSquare}
                    snake={snake}
                    game={game}
                    handleStartGame={handleStartGame}
                    handleRestartGame={handleRestartGame}/>
            </Col>
        </Row>
    );
};

const mapStateToProps = state => {
    return {
        boardSize: state.config.boardSize,
        levelVelocity: state.config.levelVelocity,
    };
};

export default connect(mapStateToProps)(Game);