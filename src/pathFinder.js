const Dijkstra = require("./dijkstra");

const BOARD_SIZE = 8;
class PathFinder {
  getMinimumMoves = (position, target) => {
    const dijkstra = new Dijkstra(position, BOARD_SIZE);
    dijkstra.start();

    return dijkstra.distances[target - 1];
  };
}

module.exports = PathFinder;
