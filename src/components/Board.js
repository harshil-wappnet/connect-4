import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const ROWS = 6;
const COLS = 7;
const WINNING_LENGTH = 4;

const Board = () => {
    const initialBoardState = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    const [boardState, setBoardState] = useState(initialBoardState);
    const [turnOfRed, setTurnOfRed] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        checkForWinner();
    }, [boardState]);

    const handleCellClick = (row, col) => {
        if (winner || boardState[row][col]) return;

        const newBoardState = [...boardState];
        const highestCol = getHighestCol(row);

        if (highestCol !== -1) {
            newBoardState[row][highestCol] = turnOfRed ? 'red' : 'yellow';
            setBoardState(newBoardState);
            setTurnOfRed(!turnOfRed);
        }
    };

    const getHighestCol = (row) => {
        for (let i = COLS - 1; i >= 0; i--) {
            if (boardState[row][i] === null) {
                return i;
            }
        }
        return -1;
    };

    const checkForWinner = () => {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const color = boardState[row][col];
                if (color) {
                    if (
                        checkLine(row, col, 1, 0, color) || // Horizontal
                        checkLine(row, col, 0, 1, color) || // Vertical
                        checkLine(row, col, 1, 1, color) || // Diagonal \
                        checkLine(row, col, 1, -1, color)   // Diagonal /
                    ) {
                        setWinner(color);
                        return;
                    }
                }
            }
        }
    };

    const checkLine = (row, col, deltaRow, deltaCol, color) => {
        let consecutive = 1; // Change const to let
        let r = row + deltaRow;
        let c = col + deltaCol;

        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && boardState[r][c] === color) {
            consecutive++;
            r += deltaRow;
            c += deltaCol;
        }

        r = row - deltaRow;
        c = col - deltaCol;

        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && boardState[r][c] === color) {
            consecutive++;
            r -= deltaRow;
            c -= deltaCol;
        }

        return consecutive >= WINNING_LENGTH;
    };

    const renderCells = () => {
        return boardState.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="row">
                {row.map((cell, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={cell}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                ))}
            </div>
        ));
    };

    return (
        <div>
            <h3>Board</h3>
            <div className='container d-flex'>
                {renderCells()}
            </div>
            {winner && <div>{winner.toUpperCase()} wins!</div>}
        </div>
    );
};

export default Board;
