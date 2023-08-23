class PathFinder {
    getMinimumMoves(position, target) {
        const n = 8;
        const directions = [
            { dx: 2, dy: 1 },
            { dx: 2, dy: -1 },
            { dx: -2, dy: 1 },
            { dx: -2, dy: -1 },
            { dx: 1, dy: 2 },
            { dx: 1, dy: -2 },
            { dx: -1, dy: 2 },
            { dx: -1, dy: -2 }
        ];

        const queue = [{ pos: position, moves: 0 }];
        const visited = new Array(n * n).fill(false);
        visited[position - 1] = true;

        while (queue.length > 0) {
            const { pos, moves } = queue.shift();

            if (pos === target) {
                return moves;
            }

            const row = Math.floor((pos - 1) / n);
            const col = (pos - 1) % n;

            for (let i = 0; i < directions.length; i++) {
                const dir = directions[i];
                const newRow = row + dir.dy;
                const newCol = col + dir.dx;

                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                    const newPos = newRow * n + newCol + 1;

                    if (!visited[newPos - 1]) {
                        visited[newPos - 1] = true;
                        queue.push({ pos: newPos, moves: moves + 1 });
                    }
                }
            }
        }

        return -1;
    }
}

module.exports = PathFinder;