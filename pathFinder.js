class PathFinder {

    square_length = 8;
    min_moves = null;

    getAllowedMoves = (position) => {
        // 36 = 19, 21, 26, 30, 42, 46, 51, 53
        // 36 = (2, 2), (4, 2), (3, 1), (3, 5), (3, 5)

        const coords = position;
        if (typeof position == 'int') {
            const coords = this.getCoordinates(position);
        }

        const possible_moves = [
            [coords[0] - 1, coords[1] + 2],
            [coords[0] - 1, coords[1] - 2],
            [coords[0] + 1, coords[1] + 2],
            [coords[0] + 1, coords[1] - 2],
            [coords[0] - 2, coords[1] + 1],
            [coords[0] - 2, coords[1] - 1],
            [coords[0] + 2, coords[1] + 1],
            [coords[0] + 2, coords[1] - 1]
        ];

        const allowed_moves = [];
        // console.log(possible_moves);

        possible_moves.forEach(element => {
            if (element[0] >= 0 && element[0] < this.square_length
                && element[1] >= 0 && element[1] < this.square_length) {
                allowed_moves.push(element);
            }
        });

        // console.log(allowed_moves);

        return allowed_moves;
    }

    getCoordinates = (position) => {
        return  [Math.trunc((position - 1) / this.square_length), (position - 1) % this.square_length];
    }

    exploreRecursive = (past_moves, target) => {
        if (past_moves.length>100) return;
        const [last_move] = past_moves.slice(-1);

        // console.log(past_moves);
        // console.log(last_move);

        // stop recursion if target found & store min_moves
        if (last_move[0] == target[0] && last_move[1] == target[1]) {
            if (!this.min_moves || this.min_moves > past_moves.length - 1) {
                this.min_moves = past_moves.length - 1;
            }
            // console.log(this.min_moves);
            return this.min_moves;
        }

        // return;
        
        // stop recursion if moves superior to min_moves found in another branch
        if (this.min_moves && this.min_moves <= past_moves.length - 1) {
            // console.log('end branch recursion : ' + this.min_moves);
            return this.min_moves;
        }

        const next_moves = this.getAllowedMoves(last_move);
        // console.log(last_move);
        // console.log(next_moves);

        next_moves.forEach(element => {
            var explore_ = [...past_moves]; //.push(element);
            explore_.push(element);
            // console.log(explore_);
            // return;
            return this.explore(explore_, target);
        });

        return this.min_moves;
    }

    exploreIterative = (init_coords, target_coords) => {
        const [init_x, init_y] = init_coords;
        const [target_x, target_y] = target_coords;

        if (init_x == target_x && init_y == target_y) return 0;
        
        const possible_moves = [
            [-1, 2], [-1, -2],
            [1, 2], [1, -2],
            [-2, 1], [-2, -1],
            [2, 1], [2, -1],
        ];

        // console.log(init_coords);
        // console.log(target_coords);

        // array to keep visited cells
        const square_map = Array.from({ length: this.square_length }, () => Array(this.square_length).fill(false));
        square_map[init_x][init_y] = true;

        const moves = [[init_x, init_y, 0]];

        while (moves.length) {
            const [cell_x, cell_y, nb_moves] = moves.shift();

            for (const [delta_x, delta_y] of possible_moves) {
                const new_x = cell_x + delta_x;
                const new_y = cell_y + delta_y;

                if (new_x >= 0 && new_x < this.square_length && new_y >= 0 && new_y < this.square_length && !square_map[new_y][new_x]) {
                    if (new_x === target_x && new_y === target_y) return nb_moves + 1;

                    square_map[init_x][init_y] = true;
                    moves.push([new_x, new_y, nb_moves + 1]);
                    // console.log(moves);
                }
            }
        }

        return null;
    }

    getMinimumMoves = (position, target) => {
        // console.log(this.getCoordinates(position))
        // console.log(this.getAllowedMoves(position))

        const init_coords = this.getCoordinates(position);
        const target_coords = this.getCoordinates(target);

        // console.log(init_coords)
        // console.log(target_coords)
        
        // Recursive version (prototyping / initial problem solving)
        // return this.exploreRecursive([init_coords], target_coords);

        // Iterative version (optimized)
        return this.exploreIterative(init_coords, target_coords);
    }
}

module.exports = PathFinder;