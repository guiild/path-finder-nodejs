class PathFinder {

    constructor(position, target) {
        this.position = position;
        this.target = target;
        this.edge = 8;
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
        return Math.abs(((this.position-1) % this.edge) - ((this.target-1) % this.edge));
    }

    get dy() {
        return Math.abs(Math.floor((this.position-1) / this.edge) - Math.floor((this.target-1) / this.edge));
    }

}

module.exports = PathFinder;
