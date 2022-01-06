import React, { useState } from 'react';

import './App.css';
import Board from "./Board";
import nextTurn from "./AI";
import EndPanel from "./EndPanel";

// Board Size
const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 7;

// Game States
const GAME_IN_PROGRESS = 0;
const PLAYER_1_WIN = 1;
const PLAYER_2_WIN = 2;
const DRAW = 3;

/**
 * Checks whether the current state is a winning state
 * @param r The clicked row
 * @param c The clicked column
 * @param newValues The board state to be checked
 * @returns {boolean} True, if the board state is a winning state
 */
function checkWin(r, c, newValues) {
    let count = 1;
    let player = newValues[r][c];
    // Check Bottom
    for (let i = r + 1; i <= Math.min(r + 3, newValues.length - 1); i++) {
        if (newValues[i][c] === player) count++;
        else break;
    }
    if (count === 4) return true;
    else count = 0;
    // Check Horizontal
    for (let i = Math.max(c - 3, 0); i <= Math.min(c + 3, newValues[0].length - 1); i++) {
        if (newValues[r][i] === player) count++;
        else count = 0;
        if (count === 4) return true;
    }
    count = 0;
    // Check Diagonal TL
    for (let i = Math.max(-3, -r, -c); i <= Math.min(3, newValues[0].length - 1 - c, newValues.length - 1 - r); i++) {
        if (newValues[r + i][c + i] === player) count++;
        else count = 0;
        if (count === 4) return true;
    }
    count = 0;
    // Check Diagonal TR
    for (let i = Math.max(-3, -(newValues.length - 1 - r), -c); i <= Math.min(3, newValues[0].length - 1 - c, r); i++) {
        if (newValues[r - i][c + i] === player) count++;
        else count = 0;
        if (count === 4) return true;
    }
    return false;
}

/**
 * Updates the game based on a players input
 * @param turn The current turn
 * @param setTurn Function to update the current turn
 * @param setValues Function to update the current board state
 * @param values The current board state
 * @param r The clicked row
 * @param c The clicked column
 * @param setGameState Function to update the current game state
 * @returns {unknown[]|null} The new board state or null if draw or no valid turn was made
 */
function update(turn, setTurn, setValues, values, r, c, setGameState) {
    let newValues = Array.from(values);
    // Find highest available in row in the column
    let i = values.length - 1;
    while(i >= 0 && values[i][c] !== 0) {
        i--;
    }
    // Check if column is full
    if (i !== -1) {
        // Update the game state
        newValues[i][c] = (turn % 2) + 1;
        setTurn(turn + 1);
        setValues(newValues);
        // Check if draw
        if (turn === values.length * values[0].length - 1) {
            setGameState(DRAW);
        }
        // Check if player won
        else if (checkWin(i, c, newValues)) {
            if ((turn % 2) === 0) setGameState(PLAYER_1_WIN);
            else setGameState(PLAYER_2_WIN);
            return null;
        }
        return newValues;
    } else {
        // If column is full, return null
        return null;
    }
}

/**
 * Restarts the game
 * @param setValues Function to update the current board
 * @param setGameState Function to update the current game state
 * @param setTurn Function to update the current turn
 */
function restart(setValues, setGameState, setTurn) {
    setValues(Array.from(Array(NUMBER_OF_ROWS), () => Array.from(Array(NUMBER_OF_COLUMNS), () => 0)));
    setTurn(0);
    setGameState(GAME_IN_PROGRESS);
}

/**
 * Processes player's turn and lets the AI make a turn
 * @param turn The current turn
 * @param setTurn Function to update the current turn
 * @param setValues Function to update the current board
 * @param values The state of the current board
 * @param r The clicked row
 * @param c The clicked column
 * @param setGameState Function to update the current game state
 */
function makeTurn(turn, setTurn, setValues, values, r, c, setGameState) {
    // Process player's move
    values = update(turn, setTurn, setValues, values, r, c, setGameState);
    // If the game is over or the move was invalid, return
    if (values === null) return;
    // Create a copy and process AI's move
    let copy = values.map(function(arr) {
        return arr.slice();
    });
    update(turn + 1, setTurn, setValues, values, 0, nextTurn(copy), setGameState);
}

/**
 * Main Component of the FourConnect AI Application
 * @returns {JSX.Element} The React Component rendering the game state
 * @constructor
 */
function App() {

    const [values, setValues] = useState(Array.from(Array(NUMBER_OF_ROWS), () => Array.from(Array(NUMBER_OF_COLUMNS), () => 0)));
    const [turn, setTurn] = useState(0);
    const [gameState, setGameState] = useState(GAME_IN_PROGRESS);

    return (
        <div className="App">
            <h1>Connect Four AI</h1>
            <div style={{top: "0px", left: "0px", position: "absolute", width: "100%", height: "100%"}} hidden={gameState === GAME_IN_PROGRESS} >
                <div className="fader" />
                <EndPanel gameState={gameState} restart={() => restart(setValues, setGameState, setTurn)}/>
            </div>
            <Board rows={NUMBER_OF_ROWS} columns={NUMBER_OF_COLUMNS} values={values} onClickCell={(r, c) => {
                if(gameState === GAME_IN_PROGRESS) makeTurn(turn, setTurn, setValues, values, r, c, setGameState);
            }}/>
        </div>
    );
}

export default App;
