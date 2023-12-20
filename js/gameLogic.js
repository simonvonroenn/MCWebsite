/**
 * This is the javascript file that contains all the logic regarding the game itself.
 */

/** List of all players/colors */
const colors = ['red', 'green', 'blue', 'yellow'];

let currentColorIndex = 0; // Player at index 0 starts
let selectedPiece = null; // The piece that is been dragged.

let isDragging = false; // State that indicates if a piece is currently being dragged
let draggedFrom; // The position from where the piece is being dragged

/** 
 * This method calculates all valid moves for a given player.
 * 
 * @param color the player
*/
function calculateValidMoves(color) {
    let startField = getStartField(color);
    pieces[color].forEach(piece => {
        if (board[piece.y][piece.x].type == 'house') {
            if (diceResult == 6 && startField.isEmpty()) {
                piece.validMove = startField;
            }
        } else {
            if (piece.pathIdx + diceResult < pathlength) {
                piece.validMove = board[path[color].y[piece.pathIdx + diceResult]][path[color].x[piece.pathIdx + diceResult]];
            }
        }

        if (piece.validMove != null) console.log("(" + piece.validMove.x + ", " + piece.validMove.y + ")");
    });
}

/**
 * This method calculates if a player has valid moves.
 * Necessary for determining if a player can roll the dice again.
 * @see rollDice
 * 
 * @param color the player
 * @returns {boolean} true if the player has valid moves
*/
function hasValidMoves(color) {
    return pieces[color].some(piece => piece.validMove != null);
}

/**
 * Check if a field (x,y) is a valid move for the selected piece.
 * 
 * @param {number} x the x coordinate of the field
 * @param {number} y the y coordinate of the field
 * @param {string} color the player's color
 * @returns {boolean} true if it is a valid move
 */
function isValidMove(x, y, color) {
    let field = board[y][x];
    if (field.type == 'empty' || field.type == 'house') return false;
    if (field.type == 'goal' && field.color != color) return false;
    if (selectedPiece.validMove != board[y][x]) return false;

    return true;
}

/**
 * Give the next player their turn.
 */
function changeColor() {
    pieces[colors[currentColorIndex]].forEach(piece => {
        piece.validMove = null;
    }); 
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    hasRolled = false;
    rollCounter = 1;
    updateCurrentColorDisplay();
    console.log(colors[currentColorIndex]);
}

/**
 * Update the display of the current player in the UI. 
 */
function updateCurrentColorDisplay() {
    // Update the text of the current player in the sidebar
    let newColor = colors[currentColorIndex];
    const colorDisplay = document.getElementById('currentColor');
    colorDisplay.textContent = `Spieler am Zug: ${newColor}`;

    // Set the background color of header and sidebar based on the current player
    const header = document.querySelector('.game-header');
    const sidebar = document.querySelector('.sidebar');
    header.style.backgroundColor = colorMap.get(newColor);
    sidebar.style.backgroundColor = colorMap.get(newColor);
}

/**
 * Find the start field of a player.
 * 
 * @param {string} color the player
 * @returns {object} the start field of the given player
 */
function getStartField(color) {
    for (let y = 0; y < squaresPerSide; y++) {
        for (let x = 0; x < squaresPerSide; x++) {
            if (board[y][x].type == 'start' && board[y][x].color == color) {
                return board[y][x];
            }
        }
    }
}
/**
 * Animate when a player is skipped after rolling 3x with no valid moves.
 */
function animateSkip() {
    // Skip animation, if a player has no valid moves.
}

/**
 * Select a piece when clicking on it.
 * 
 * @param {object} event the clicke event
 */
function click(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    x = Math.floor(x / squareSizePx);
    y = Math.floor(y / squareSizePx);

    pieces[colors[currentColorIndex]].forEach(piece => {
        // Check if a piece has been clicked on
        if (Math.hypot(piece.x - x, piece.y - y) * squareSizePx <= pieceRadius) {
            if (piece.validMove != null) {
                draggedFrom = {x: piece.x, y: piece.y};
                selectedPiece = piece;
                isDragging = true;
            }
            return;
        }
    });
}

/**
 * Move the selected piece when dragging it.
 * 
 * @param {object} event the event
 */
function drag(event) {
    if (isDragging && selectedPiece) {
        let rect = canvas.getBoundingClientRect();
        
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        x = Math.floor(x / squareSizePx);
        y = Math.floor(y / squareSizePx);
        if (x != selectedPiece.x || y != selectedPiece.y) {
            selectedPiece.x = x;
            selectedPiece.y = y;
            drawBoard();
        }
    }
}

/**
 * Place the selected piece on its new field (if valid move) or moving it back to its original field (if not valid move) when dropping it.
 * @param {object} event the event
 */
function drop(event) {
    if (selectedPiece && selectedPiece.color === colors[currentColorIndex] && hasRolled) {
        if (isValidMove(selectedPiece.x, selectedPiece.y, selectedPiece.color)) {
            // Update the position of the piece in the path array
            if (board[draggedFrom.y][draggedFrom.x].type == 'house') {
                selectedPiece.pathIdx = 0;
            } else {
                selectedPiece.pathIdx += diceResult;
            }
    
            // Toggle the 'Roll the dice!' message
            const rollDiceMessage = document.querySelectorAll('.rollDiceMessage');
            rollDiceMessage.forEach(o => o.style.display = 'block');

            changeColor();
        } else {
            // If the move is not valid, move the piece back to its original position
            selectedPiece.x = draggedFrom.x;
            selectedPiece.y = draggedFrom.y;
            drawBoard();
        }
    } 
    isDragging = false;
    selectedPiece = null;
}