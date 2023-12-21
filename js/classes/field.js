/** 
 * This is the Piece class.
 * It represents 1 square in the game board.
 */
class Field {
    /**
     * Create a field.
     * @constructor
     * 
     * @param {number} x the x coordinate
     * @param {number} y the y coordinate
     * @param {string} type the type of the field, indicating its role in the game
     * @param {string} color the color of the field
     */
    constructor(x, y, type, color) {
        this.x = x;
        this.y = y;
        this.type = type; // 'path', 'goal', 'house', 'start', 'empty'
        this.color = color; // 'red', 'blue', 'green', 'yellow', 'white', 'lightgrey'
    }

    /**
     * Draw the field. 
     * 
     * @param {number} size the size of the field in px
     */
    draw(size) {
        let fillColor;
        switch (this.type) {
            case 'empty':
            case 'path':
                fillColor = this.color;
                break;
            case 'house':
            case 'goal':
            case 'start':
                // Map the player colors to a more pleasant color (it looks better)
                fillColor = colorMap.get(this.color);
                break;
            default:
                fillColor = 'black';
        }
        ctx.fillStyle = fillColor;
        ctx.fillRect(this.x * size, this.y * size, size, size);

        // Draw small grid lines
        if (this.type != 'empty') {
            ctx.lineWidth = 0.05;
            ctx.strokeRect(this.x * size, this.y * size, size, size);
        }
    }

    /**
     * Check if a field contains enemy pieces.
     * 
     * @param {string} color the current player
     * @returns {boolean} true if the field contains enemy pieces
     */
    hasEnemyPiece(color) {
        for (let c of colors) {
            if (c == color) {
                continue;
            }
            for (let piece of pieces[c]) {
                if (piece.x === this.x && piece.y === this.y) {
                    return true;
                }
            }
        }
        return false;
    }    

    /**
     * Check if the field contains pieces from the current player.
     * 
     * @param {string} color the current player
     * @returns {boolean} true if the field contains pieces from the current player
     */
    hasOwnPiece(color) {
        for (const piece of pieces[color]) {
            if (piece.x == this.x && piece.y == this.y) {
                return true;
            }
        }
        return false;
    }    
}
