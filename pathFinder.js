class PathFinder {
    MATRIX_WIDTH = 8;

    /* All available move combinations for a knight */
    moves = [
        [1, 2], [1, -2],
        [-1, 2], [-1, -2],
        [2, 1], [2, -1],
        [-2, 1], [-2, -1]
    ];

    constructor(matrixWidth = 8) {
        this.MATRIX_WIDTH = matrixWidth;
    }
    getMinimumMoves = (position, target) => {
        const start = new Point(position, this.MATRIX_WIDTH);
        const end = new Point(target, this.MATRIX_WIDTH);
        const queue = [start];
        const visited = new Set();
        let moves = 0;
        while (queue.length) {
            const size = queue.length;
            for (let i = 0; i < size; i++) {
                const current = queue.shift();
                if (current.equals(end)) {
                    return moves;
                }
                const targets = this.getAvailableTargets(current);
                for (let target of targets) {
                    const targetOrdinal = target.value;
                    if (!visited.has(targetOrdinal)) {
                        queue.push(target);
                        visited.add(targetOrdinal);
                    }
                }
            }
            moves++;
        }
        return -1;
    };

    /** Get all available targets for a given position for a knight move.
     * @return array possible target positions */
    getAvailableTargets(position) {
        let targets = [];
        for (let c = 0; c < this.moves.length; c++) {
            targets.push(position.move(
                this.moves[c][0],
                this.moves[c][1]
            ));
        }
        return targets.filter(pt => pt !== null);
    }


}

/** Class representing a point in a matrix.
 * Allow to test coordinates and to transform between matrix coordinates and numeral position */
class Point {

    value = 0;

    matrixWidth = 8;


    /** Create a point from a matrix coordinate or a numeral position
     *
     * @param position either {x: 1, y: 2} json object or ordinal position value
     * @param matrixWidth
     */
    constructor(position, matrixWidth) {
        this.matrixWidth = matrixWidth;
        if (typeof position === 'object') {
            this.fromXY(position.x, position.y);
        } else {
            this.value = position;
        }
    }

    /** Transform a numeral position to x,y matrix coordinate */
    fromXY(x, y) {
        this.value = this.matrixWidth * (y - 1) + x;
        return this.value;
    }

    /** Transform x,y  matrix coordinates to numeral position */
    toXY() {
        return {
            x: this.getX(),
            y: this.getY()
        };
    }

    /** Get Horizontal coordinate */
    getX() {
        const x = this.value % this.matrixWidth;
        return x === 0 ? this.matrixWidth : x;
    }

    /** Get vertical coordinate */
    getY() {
        return Math.ceil(this.value / this.matrixWidth);
    }

    /** Are two points equals */
    equals(end) {
        return end instanceof Point && this.value === end.value && this.matrixWidth === end.matrixWidth;
    }


    /** Get new point after x,y move description
     *
     * @param x horizontal offset
     * @param y vertical offset
     * @returns {Point}
     */
    move(x, y) {
        const newX = this.getX() + x;
        const newY = this.getY() + y;
        if (newX < 1 || newX > this.matrixWidth || newY < 1 || newY > this.matrixWidth) {
            return null;
        }
        return new Point({
                x: this.getX() + x,
                y: this.getY() + y
            },
            this.matrixWidth
        );
    }
}

module.exports = PathFinder;
