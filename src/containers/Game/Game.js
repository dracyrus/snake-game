import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";

import {updateObject, useInterval} from "../../shared/utility";

import Board from "../../components/Board/Board";
import BoardGameOver from "../../components/Board/BoardGameOver/BoardGameOver";
import BoardGameStart from "../../components/Board/BoardGameStart/BoardGameStart";

import './Game.css';

const Game = () => {
    /*************** STATE DECLARATION ***************/
    const [board, setBoard] = useState({
        numberRow: 26,
        numberColumn: 26,
        boardSquare: [],
        velocity: 300,
        foodPosition: null,
    });
    const [snake, setSnake] = useState({
        head: {
            row: parseInt(board.numberRow / 2),
            column: parseInt(board.numberColumn / 2),
            direction: 'right'
        },
        tails: [],
        isDead: false,
    });
    const [game, setGame] = useState({
        score: 0,
        isStarted: false,
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
    }, game.isStarted && !snake.isDead ? board.velocity : null);

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
     * Function start the game
     */
    const handleStartGame = () => {
        setGame({
            score: 0,
            isStarted: true,
        });
    }

    /**
     * Function reload the game
     */
    const restartGame = () => {
        window.location.reload(false);
    }

    /**
     * Function that update the board with the snake and food position
     */
    const updateBoard = () => {
        const boardSquards = [];

        const isEatFood = validEatFood();

        let score = game.score;
        if(isEatFood){
            score  += 10;
            addTailSnake();
        }

        const foodPosition   = (!board.foodPosition || isEatFood) ? updateFoodPosition() : board.foodPosition;
        let row, column = 0;

        for (row = 0; row < board.numberRow; row++) {
            for (column = 0; column < board.numberColumn; column++) {

                const isSnake = (snake.head.row === row && snake.head.column === column);
                const isFood  = (foodPosition.row === row && foodPosition.column === column);
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

        updateBoardState(boardSquards, foodPosition);
        updateScore(score);
    }

    /**
     *
     * @param boardSquards
     * @param foodPosition
     */
    const updateBoardState = (boardSquards, foodPosition) => {
        const updatedBoard = updateObject(board, {
            boardSquare: boardSquards,
            foodPosition: foodPosition,
        });

        setBoard(updatedBoard);
    }

    /**
     *
     * @param score
     */
    const updateScore = score => {
        const updatedGame = updateObject(game, {
            score: score
        });

        setGame(updatedGame);
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
     *
     */
    const addTailSnake = () => {
        const tails = [...snake.tails];

        let lastPositionTail = (tails.length > 0) ? tails[tails.length-1] : snake.head;

        const newPositionTail = getNewPositionSnakeTail(lastPositionTail);
        tails.push(newPositionTail);
        const newSnake = {
            tails,
        }

        updateSnake(newSnake);
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
        const newPositionSnake = getNewPositionSnake();
        const newPositionsSnakeTail = getNewPositionsSnakeTail(snake.head);
        const updatedElementHead = updateObject(snake.head, newPositionSnake);

        const isDead = validIsDead(newPositionSnake, newPositionsSnakeTail);

        const newSnake = {
            head: updatedElementHead,
            isDead: isDead,
            tails: newPositionsSnakeTail,
        }

        updateSnake(newSnake);
    }

    /**
     *
     * @returns {{column: number, row: number}}
     */
    const getNewPositionSnake = () => {
        const {direction, row, column} = snake.head;

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
     * @returns {{column: number, row: number}}
     */
    const getNewPositionSnakeTail = tail => {
        switch (snake.head.direction) {
            case 'up':
                return {row: tail.row - 1, column: tail.column}
            case 'down':
                return {row: tail.row + 1, column: tail.column}
            case 'left':
                return {row: tail.row, column: tail.column - 1}
            case 'right':
            default:
                return {row: tail.row, column: tail.column + 1}
        }
    }

    /**
     *
     * @returns {[]}
     */
    const getNewPositionsSnakeTail = positionSnake => {
        const {tails} = snake;
        const {score} = game;
        let tailNewPosition = [];
        let newPositionTail, tailElementPosition = null;

        if(snake.tails.length > 0){
            tails.map((element, index) => {
                newPositionTail = (index === 0) ? positionSnake : tailElementPosition
                tailNewPosition.push(newPositionTail);
                tailElementPosition = element;
            });

            if((score/10) !== tails.length) tailNewPosition.push(tailElementPosition);
        }else if(score !== 0){
            tailNewPosition.push(positionSnake);
        }

        return tailNewPosition;
    }

    /**
     *
     * @returns {boolean|boolean}
     */
    const validEatFood = () => board.foodPosition && (snake.head.row === board.foodPosition.row && snake.head.column === board.foodPosition.column);

    /**
     *
     * @param newPosition
     * @param newPositionsSnakeTail
     * @returns {boolean}
     */
    const validIsDead = (newPosition, newPositionsSnakeTail) => {
        if(
            newPosition.row >= board.numberRow || newPosition.column >= board.numberColumn ||
            newPosition.row < 0 || newPosition.column < 0 ||
            newPositionsSnakeTail.find(tail => tail.row === newPosition.row && tail.column === newPosition.column)
        )
            return true;

        return false;
    }

    /**
     * Function that update snake state
     * @param updateElement
     */
    const updateSnake = updateElement => {
        const updatedSnake = updateObject(snake, updateElement);
        setSnake(updatedSnake);
    }

    let boardBox = null;

    if(!game.isStarted) boardBox = <BoardGameStart handleStartGame={handleStartGame}/>;
    else if(snake.isDead) boardBox = <BoardGameOver handleRestartGame={restartGame}/>;

    return (
        <Row className='p-5 m-0 w-100'>
            <Col lg={12} className="text-center">
                {boardBox}
                <Board
                    boardSquare={board.boardSquare}
                    direction={snake.head.direction}
                    score={game.score}/>

            </Col>
        </Row>
    );
};

export default Game;

