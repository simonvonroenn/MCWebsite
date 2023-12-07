class Field {

    colorMap = new Map([
        ['red', 'lightpink'],
        ['blue', 'lightblue'],
        ['green', 'lightgreen'],
        ['yellow', 'khaki']
    ]);

    constructor(type, color) {
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
    }
}
