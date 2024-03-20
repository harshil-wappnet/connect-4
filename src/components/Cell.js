import React from 'react';

const Cell = ({ value, onClick }) => {
    let backgroundColor = '';

    // Set background color based on the value of the cell
    if (value === 'red') {
        backgroundColor = 'red';
    } else if (value === 'yellow') {
        backgroundColor = 'yellow';
    }

    return (
        <div>
            <button
                className="eclipse-button"
                onClick={onClick}
                style={{ backgroundColor: backgroundColor }} // Set background color inline
            >
            </button>
        </div>
    );
};

export default Cell;
