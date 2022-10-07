const { times, head, isEmpty, forEach } = require("lodash");
const Board = require("./board");

class Dijkstra {
  startPosition;
  board;
  distances;
  steps;
  visitedSummits;

  constructor(startPosition, boardSize) {
    this.startPosition = startPosition;
    this.board = new Board(boardSize);
    this.distances = times(boardSize * boardSize, (i) =>
      i === startPosition - 1 ? 0 : Infinity
    );
    this.steps = [startPosition];
    this.visitedSummits = [];
  }

  start() {
    while (!isEmpty(this.steps)) {
      const currentStep = this.steps.shift();

      const neighbors = this.board.getLegalMoves(currentStep);

      forEach(neighbors, (neighbor) => {
        const distanceFromCurrent = this.distances[currentStep - 1] + 1;
        if (distanceFromCurrent < this.distances[neighbor - 1]) {
          this.distances[neighbor - 1] = distanceFromCurrent;
        }
        if (!this.visitedSummits.includes(neighbor)) {
          this.steps.push(neighbor);
        }
      });

      this.visitedSummits.push(currentStep);
    }
  }
}

module.exports = Dijkstra;
