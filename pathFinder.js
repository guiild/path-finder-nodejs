const BOARD_SIZE = 8;
class PathFinder {
  left = (position) => {
    if (position === -1) {
      return -1;
    }

    if (position % BOARD_SIZE === 1) {
      return -1;
    }

    return position - 1;
  };

  right = (position) => {
    if (position === -1) {
      return -1;
    }
    if (position % BOARD_SIZE === 0) {
      return -1;
    }

    return position + 1;
  };

  up = (position) => {
    if (position === -1) {
      return -1;
    }
    if (position / BOARD_SIZE <= 1) {
      return -1;
    }

    return position - BOARD_SIZE;
  };

  down = (position) => {
    if (position === -1) {
      return -1;
    }
    if (position / BOARD_SIZE > BOARD_SIZE - 1) {
      return -1;
    }

    return position + BOARD_SIZE;
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

  getMinimumMoves = (position, target) => {
    return 0;
  };
}

module.exports = PathFinder;
