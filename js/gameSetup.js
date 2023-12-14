const boardSizePx = 500;
const squaresPerSide = 11;
const squareSizePx = boardSizePx / squaresPerSide;
const pieceRadius = squareSizePx / 3; // Radius der Spielfiguren

let board = [];

let boardSetup = [
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

let pathlength = 44;
let path = {
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

let boardMapType = new Map([
    ['h', 'house'],
    ['e', 'empty'],
    ['p', 'path'],
    ['g', 'goal'],
    ['s', 'start']
]);

let boardMapColor = new Map([
    ['r', 'red'],
    ['g', 'green'],
    ['b', 'blue'],
    ['y', 'yellow'],
    ['w', 'white'],
    ['l', 'lightgrey']
]);

// Anfangspositionen der Spielfiguren
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

    // Pfadfelder
    fieldType = 'path';
    fieldColor = 'lightgrey';
    for (let y = 0; y < squaresPerSide; y++) {
        for (let x = 0; x < squaresPerSide; x++) {
            if (board[y][x].type != 'empty') continue;
            if (x == 5 && y == 5) continue;
            if (neighborExists(x, y, 'goal')) board[y][x] = new Field(x, y, fieldType, fieldColor, index);
        }
    }
}

function neighborExists(x, y, type) {
    // Überprüfe alle acht möglichen Nachbarn
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            // Überspringe das aktuelle Feld selbst
            if (dx === 0 && dy === 0) {
                continue;
            }

            let neighborX = x + dx;
            let neighborY = y + dy;

            // Überprüfe, ob der Nachbar innerhalb des Spielbretts liegt
            if (neighborX >= 0 && neighborX < squaresPerSide && neighborY >= 0 && neighborY < squaresPerSide) {
                // Überprüfe den Typ des Nachbarfeldes
                if (board[neighborY][neighborX].type === type) {
                    return true;
                }
            }
        }
    }

    return false;
}

function setRandomDiceAtStart() {
    let randomStartDice = Math.floor(Math.random() * 6) + 1;
    let diceImage = document.getElementById('diceImage');
    diceImage.src = `img/dice/dice-${randomStartDice}.svg`;
    diceImage.classList.add('dice-filter'); // Fügt den grauen Filtereffekt hinzu
}

function drawBoard() {
    // Zeichnet das Grundlayout des Bretts
    for (let y = 0; y < squaresPerSide; y++) {
        for (let x = 0; x < squaresPerSide; x++) {
            board[y][x].draw(ctx, x, y, squareSizePx);
        }
    }

    // Spielfiguren zeichnen
    for (const color in pieces) {
        pieces[color].forEach(piece => {
            piece.draw();
        });
    }

    // Ausgewählte Figur zeichnen
    if (selectedPiece != null) {
        selectedPiece.draw();
    }
}