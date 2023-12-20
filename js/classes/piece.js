/**
 * This is the Piece class.
 * It represents 1 piece of a player.
 */
class Piece {
    /**
     * Create a piece.
     * @constructor
     * 
     * @param {string} color the color of the piece and also the player it belongs to
     * @param {number} x the x coordinate
     * @param {number} y the y coordinate
     * @param {number} pathIdx the current position of the piece in the path array, i.e. the path the pieces go along from start to finish
     */
    constructor(color, x, y, pathIdx) {
        this.color = color; // 'red', 'blue', 'green', 'yellow'
        this.x = x;
        this.y = y;
        this.pathIdx = pathIdx;
        this.validMove = null; // the field the piece can move to based on the current dice result
    }
    
    /**
     * Draw the piece.
     */
    draw(squareSize, radius) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x * squareSize + squareSize / 2, this.y * squareSize + squareSize / 2, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
