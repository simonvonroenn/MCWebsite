/**
 * This is the javascript file that contains all setup variables and setup methods to create the game board.
 */

/** 
 * Board setup.
 * The first letter sets the type of the field.
 * @see boardMapType
 * The second letter sets the color of the field.
 * @see boardMapColor
 */
const boardSetup = [
    ['hr', 'hr', 'ew', 'ew', 'pl', 'pl', 'sg', 'ew', 'ew', 'hg', 'hg'],
    ['hr', 'hr', 'ew', 'ew', 'pl', 'gg', 'pl', 'ew', 'ew', 'hg', 'hg'],
    ['ew', 'ew', 'ew', 'ew', 'pl', 'gg', 'pl', 'ew', 'ew', 'ew', 'ew'],
    ['ew', 'ew', 'ew', 'ew', 'pl', 'gg', 'pl', 'ew', 'ew', 'ew', 'ew'],
    ['sr', 'pl', 'pl', 'pl', 'pl', 'gg', 'pl', 'pl', 'pl', 'pl', 'pl'],
    ['pl', 'gr', 'gr', 'gr', 'gr', 'ew', 'gb', 'gb', 'gb', 'gb', 'pl'],
    ['pl', 'pl', 'pl', 'pl', 'pl', 'gy', 'pl', 'pl', 'pl', 'pl', 'sb'],
    ['ew', 'ew', 'ew', 'ew', 'pl', 'gy', 'pl', 'ew', 'ew', 'ew', 'ew'],
    ['ew', 'ew', 'ew', 'ew', 'pl', 'gy', 'pl', 'ew', 'ew', 'ew', 'ew'],
    ['hy', 'hy', 'ew', 'ew', 'pl', 'gy', 'pl', 'ew', 'ew', 'hb', 'hb'],
    ['hy', 'hy', 'ew', 'ew', 'sy', 'pl', 'pl', 'ew', 'ew', 'hb', 'hb'],
];

/**
 * Mapping of the types for the board setup.
 * @see boardSetup
 */
const boardMapType = new Map([
    ['h', 'house'],
    ['e', 'empty'],
    ['p', 'path'],
    ['g', 'goal'],
    ['s', 'start']
]);

/**
 * Mapping of the colors for the board setup.
 * @see boardSetup
 */
const boardMapColor = new Map([
    ['r', 'red'],
    ['g', 'green'],
    ['b', 'blue'],
    ['y', 'yellow'],
    ['w', 'white'],
    ['l', 'lightgrey']
]);

/** The amount of fields in a path. */
const pathlength = 44;

/** The x and y coordinates of the fields in the order of the path for each color. */
const path = {
    red: {
        x: [0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4],
        y: [4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5]
    },
    green: {
        x: [6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5],
        y: [0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4]
    },
    blue: {
        x: [10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6],
        y: [6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5]
    },
    yellow: {
        x: [4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5],
        y: [10, 9, 8, 7, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6]
    }
}

/** Mapping of the player colors to more pleasant colors (looks better). */
const colorMap = new Map([
    ['red', 'lightpink'],
    ['blue', 'lightblue'],
    ['green', 'lightgreen'],
    ['yellow', 'khaki'],
]);

/** Number of sqaures per side */
const squaresPerSide = 11;

// The board
let board = [];

// Size of the board
let boardSizePx;

// Size of each square
let squareSizePx;

// Radius of the pieces
let pieceRadius;

// Starting position of the pieces
let pieces = {
    red: [
        new Piece('red', 0, 0, -1), 
        new Piece('red', 1, 0, -1), 
        new Piece('red', 0, 1, -1), 
        new Piece('red', 1, 1, -1)
    ],
    green: [
        new Piece('green', 9, 0, -1), 
        new Piece('green', 10, 0, -1), 
        new Piece('green', 9, 1, -1), 
        new Piece('green', 10, 1, -1)
    ],
    yellow: [
        new Piece('yellow', 0, 9, -1), 
        new Piece('yellow', 1, 9, -1), 
        new Piece('yellow', 0, 10, -1), 
        new Piece('yellow', 1, 10, -1)
    ],
    blue: [
        new Piece('blue', 9, 9, -1), 
        new Piece('blue', 10, 9, -1), 
        new Piece('blue', 9, 10, -1), 
        new Piece('blue', 10, 10, -1)
    ]
};

/**
 * Set up of the board.
 */
function setup() {
    setRandomDiceAtStart();

    let fieldType;
    let fieldColor;

    for (let y = 0; y < squaresPerSide; y++) {
        let row = [];
        for (let x = 0; x < squaresPerSide; x++) {
            fieldType = boardMapType.get(boardSetup[y][x][0]);
            fieldColor = boardMapColor.get(boardSetup[y][x][1]);

            row.push(new Field(x, y, fieldType, fieldColor));
        }
        board.push(row);
    }
}

/**
 * Set a random dice image when the page loads.
 */
function setRandomDiceAtStart() {
    let randomStartDice = Math.floor(Math.random() * 6) + 1;
    let diceImage = document.getElementById('diceImage');
    diceImage.src = `img/dice/dice-${randomStartDice}.svg`;
    diceImage.classList.add('dice-filter'); // Add the grey filter effect
}

/**
 * Draw the board.
 */
function drawBoard() {
    // Update size of the board (maximum is 500px)
    boardSizePx = Math.min(document.getElementById('gameCanvas').width, 500);
    console.log(boardSizePx);
    squareSizePx = boardSizePx / squaresPerSide;
    console.log(squareSizePx);
    pieceRadius = squareSizePx / 3;

    // Draw the basic layout of the game field
    for (let y = 0; y < squaresPerSide; y++) {
        for (let x = 0; x < squaresPerSide; x++) {
            board[y][x].draw(squareSizePx);
        }
    }

    // Draw the pieces
    for (const color in pieces) {
        pieces[color].forEach(piece => {
            piece.draw(squareSizePx, pieceRadius);
        });
    }

    // Draw the selected piece at the end to make sure that it is in the foreground of everything.
    if (selectedPiece != null) {
        selectedPiece.draw();
    }
}