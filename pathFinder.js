var assert = require('assert');

class PathFinder {

    constructor(actual, target, edge = 8) {
	assert(edge >= 5, 'Minimum edge size is 5');
        this.from = new Position(edge, actual)
        this.to = new Position(edge, target)
        this.map = new Map(this.from, this.to)
    }

    getMinimumMoves = () => {
        if (this.is_diagonal_special_case) {
            return 4;
	} else if (this.is_near_special_case) {
            return 3;
	} else if (this.is_corner_special_case) {
            return 4;
        }
        return this.map.mp + ((this.map.mp + this.map.dx + this.map.dy) % 2)
    }

    get is_diagonal_special_case() {
        return (this.map.dx == 2) && (this.map.dy == 2)
    }

    get is_near_special_case() {
        return (this.map.dx + this.map.dy) == 1
    }

    get is_corner_special_case() {
        return this.from.is_in_corner
	    && this.map.dx == 1
	    && this.map.dy == 1
    }
}

class Map {

    constructor(from, to) {
        this.from = from;
        this.to = to;
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
        assert(0 < index <= edge*edge)
        this.edge = edge;
	this.index = index;
    }

    get x() {
        return (this.index - 1) % this.edge
    }

    get y() {
        return Math.floor((this.index - 1) / this.edge)
    }

    get is_in_corner() {
        let corners = [1, this.edge, (this.edge * this.edge - this.edge + 1), (this.edge * this.edge)]
        return this.index in corners
    }
}

module.exports = PathFinder;
