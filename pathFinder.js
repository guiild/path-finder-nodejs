class PathFinder {
  board_size = 8;

  getMinimumMoves = (position, target) => {
    let positions_at_current_move = new Set([position]);
    let move_count = 0;

    while (!positions_at_current_move.has(target)) {
      const positions_at_next_move = new Set();

      positions_at_current_move.forEach((current_position) => {
        this.getNextPositions(current_position).forEach((next_position) => {
          positions_at_next_move.add(next_position);
        });
      });

      positions_at_current_move = positions_at_next_move;
      move_count += 1;
    }
    return move_count;
  };

  getNextPositions = (position) => {
    const zero_indexed_position = position - 1;
    const position_coordinates = [
      Math.floor(zero_indexed_position / this.board_size),
      zero_indexed_position % this.board_size,
    ];

    const next_positions_coordinates = [
      [position_coordinates[0] - 1, position_coordinates[1] - 2],
      [position_coordinates[0] - 2, position_coordinates[1] - 1],
      [position_coordinates[0] - 1, position_coordinates[1] + 2],
      [position_coordinates[0] - 2, position_coordinates[1] + 1],
      [position_coordinates[0] + 1, position_coordinates[1] - 2],
      [position_coordinates[0] + 2, position_coordinates[1] - 1],
      [position_coordinates[0] + 1, position_coordinates[1] + 2],
      [position_coordinates[0] + 2, position_coordinates[1] + 1],
    ];

    const next_positions = next_positions_coordinates
      .filter(
        (coordinate) =>
          0 <= coordinate[0] &&
          coordinate[0] <= this.board_size &&
          0 <= coordinate[1] &&
          coordinate[1] <= this.board_size
      )
      .map((coordinate) => coordinate[0] * this.board_size + coordinate[1])
      .map((zero_indexed_position) => zero_indexed_position + 1);

    return next_positions;
  };
}

module.exports = PathFinder;