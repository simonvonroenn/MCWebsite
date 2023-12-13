class Field {

    colorMap = new Map([
        ['red', 'lightpink'],
        ['blue', 'lightblue'],
        ['green', 'lightgreen'],
        ['yellow', 'khaki'],
    ]);

    constructor(x, y, type, color) {
        this.x = x;
        this.y = y;
        this.type = type; // 'path', 'goal', 'house', 'start', 'empty'
        this.color = color; // 'red', 'blue', 'green', 'yellow'
    }

    draw(ctx, x, y, size) {
        let fillColor;
        switch (this.type) {
            case 'empty':
            case 'path':
                fillColor = this.color;
                break;
            case 'house':
            case 'goal':
            case 'start':
                fillColor = this.colorMap.get(this.color);
                break;
            default:
                fillColor = 'black';
        }

        ctx.fillStyle = fillColor;
        ctx.fillRect(x * size, y * size, size, size);
        if (this.type != 'empty') {
            ctx.lineWidth = 0.05;
            ctx.strokeRect(x * squareSizePx, y * squareSizePx, squareSizePx, squareSizePx);
        }
    }

    isEmpty() {
        pieces[this.color].forEach(piece => {
            if (piece.x == this.x && piece.y == this.y) {
                return false;
            }
        });
        return true;
    }
}
