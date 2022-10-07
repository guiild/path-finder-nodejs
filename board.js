class Board {
  boardSize;

  constructor(boardSize = 8) {
    this.boardSize = boardSize;
  }

  left = (position) => {
    if (position === -1) {
      return -1;
    }

    if (position % this.boardSize === 1) {
      return -1;
    }

    return position - 1;
  };

  right = (position) => {
    if (position === -1) {
      return -1;
    }
    if (position % this.boardSize === 0) {
      return -1;
    }

    return position + 1;
  };

  up = (position) => {
    if (position === -1) {
      return -1;
    }
    if (position / this.boardSize <= 1) {
      return -1;
    }

    return position - this.boardSize;
  };

  down = (position) => {
    if (position === -1) {
      return -1;
    }
    if (position / this.boardSize > this.boardSize - 1) {
      return -1;
    }

    return position + this.boardSize;
  };

  getLegalMoves = (position) => {
    return [
      this.up(this.up(this.left(position))),
      this.up(this.up(this.right(position))),
      this.right(this.right(this.up(position))),
      this.right(this.right(this.down(position))),
      this.down(this.down(this.right(position))),
      this.down(this.down(this.left(position))),
      this.left(this.left(this.down(position))),
      this.left(this.left(this.up(position))),
    ].filter((move) => move !== -1);
  };
}

module.exports = Board;
