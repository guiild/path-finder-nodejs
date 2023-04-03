class PathFinder {

    constructor(actual, target) {
        this.edge = 8;
        this.from = new Position(this.edge, actual)
        this.to = new Position(this.edge, target)
    }

    getMinimumMoves = () => {
        if (this.is_diagonal_2) {
            return 4;
	} else if (this.is_near) {
            return 3;
	}
        return this.mp + ((this.mp + this.dx + this.dy) % 2)
    }

    get is_diagonal_2() {
        return (this.dx == 2) && (this.dy == 2)
    }

    get is_near() {
        return (this.dx + this.dy) == 1
    }

    get mp() {
	return Math.round(Math.max(
            this.dx / 2,
            this.dy / 2,
            (this.dx + this.dy) / 3
	));
    }

    get dx() {
        return Math.abs(this.from.x - this.to.x);
    }

    get dy() {
        return Math.abs(this.from.y - this.to.y);
    }

}

class Position {

    constructor(edge, index) {
        this.edge = edge;
	this.index = index;
    }

    get x() {
        return (this.index - 1) % this.edge
    }

    get y() {
        return Math.floor((this.index - 1) / this.edge)
    }
}

module.exports = PathFinder;
