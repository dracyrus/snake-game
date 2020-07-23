import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDrumstickBite} from '@fortawesome/free-solid-svg-icons';

import {updateObject, useInterval} from "../../shared/utility";

import './Game.css';
import Board from "../../components/Board/Board";

const Game = () => {
    /*************** STATE DECLARATION ***************/
    const [board, setBoard] = useState({
        numberRow: 20,
        numberColumn: 20,
        boardSquare: [],
        velocity: 300,
        foodPosition: null,
        score: 0
    });
    const [snake, setSnake] = useState({
        head: {
            row: parseInt(board.numberRow / 2),
            column: parseInt(board.numberColumn / 2),
            direction: 'right'
        },
        tail: [],
        isDead: false,
    });

    /**
     * Function update the Board
     */
    useEffect(() => {
        updateBoard();
    }, []);

    /**
     * Function that execute every specific time until snake is dead
     */
    useInterval(() => {
        udpateSnakePosition();
    }, !snake.isDead ? board.velocity : null);

    /**
     * Function update Snake when the Position changes
     */
    useEffect(() => {
        if (!snake.isDead) {
            updateBoard();
            document.body.addEventListener('keydown', udpateSnakeDirection);
        }

        return () => document.body.removeEventListener('keydown', udpateSnakeDirection);
    }, [snake.head.row, snake.head.column]);

    /**
     * Function that update the board with the snake and food position
     */
    const updateBoard = () => {
        const boardSquards = [];

        const isEatFood = validEatFood();
        let score = board.score;
        if(isEatFood) score  += 10;

        const foodPosition   = (!board.foodPosition || isEatFood) ? updateFoodPosition() : board.foodPosition;
        let row, column = 0;
        for (row = 0; row < board.numberRow; row++) {
            for (column = 0; column < board.numberColumn; column++) {

                const isSnake = (snake.head.row === row && snake.head.column === column);
                const isFood  = (foodPosition.row === row && foodPosition.column === column);

                boardSquards.push({
                    row,
                    column,
                    isSnake,
                    isFood
                })
            }
        }

        const updatedBoard = updateObject(board, {
            boardSquare: boardSquards,
            foodPosition: foodPosition,
            score: score,
        });

        setBoard(updatedBoard);
    }

    /**
     * Function that update food position
     * @returns {{column: number, row: number}}
     */
    const updateFoodPosition = () => {
        return {
            row: Math.floor(Math.random() * (board.numberRow - 1)) + 1,
            column: Math.floor(Math.random() * (board.numberColumn - 1)) + 1,
        };
    }

    /**
     * Function that update snake direction
     * @param e
     */
    const udpateSnakeDirection = e => {
        let direction;

        switch (e.keyCode) {
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
                e.preventDefault();
                return;
        }

        const updatedElement = updateObject(snake.head, {direction: direction});
        updateSnake({head: updatedElement});
    }

    /**
     *
     */
    const udpateSnakePosition = () => {
        const newPosition = getNewPosition(snake.head);

        const updatedElementHead = updateObject(snake.head, newPosition);

        const isDead = validIsDead(newPosition);

        const newSnake = {
            head: updatedElementHead,
            isDead: isDead,
        }

        updateSnake(newSnake);
    }

    /**
     *
     * @returns {{column: number, row: number}}
     */
    const getNewPosition = () => {
        switch (snake.head.direction) {
            case 'up':
                return {row: snake.head.row - 1, column: snake.head.column}
            case 'down':
                return {row: snake.head.row + 1, column: snake.head.column}
            case 'left':
                return {row: snake.head.row, column: snake.head.column - 1}
            case 'right':
            default:
                return {row: snake.head.row, column: snake.head.column + 1}
        }
    }

    /**
     *
     * @returns {boolean|boolean}
     */
    const validEatFood = () => {
        if(!board.foodPosition) return false;

        return snake.head.row === board.foodPosition.row && snake.head.column === board.foodPosition.column;
    }

    /**
     * Function that valid if the snake is alive
     * @param newPosition
     * @returns {boolean|*|number}
     */
    const validIsDead = (newPosition) => newPosition.row > board.numberRow || newPosition.column > board.numberColumn

    /**
     * Function that update snake state
     * @param updateElement
     */
    const updateSnake = (updateElement) => {
        const updatedSnake = updateObject(snake, updateElement);
        setSnake(updatedSnake);
    }

    return (
        <Row className='p-5 w-100'>
            <Col lg={12} className="text-center">
                <h4 className='mb-5'><FontAwesomeIcon icon={faDrumstickBite}/> {board.score}</h4>
            </Col>
            <Col lg={12} className="text-center">
                <Board
                    boardSquare={board.boardSquare}
                    direction={snake.head.direction}/>
            </Col>
        </Row>
    );
};

export default Game;

