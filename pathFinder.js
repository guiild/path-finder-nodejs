class PathFinder {
    /**
     *
     * @param {number} position
     * @param {number} target
     * @param {number} n
     * @returns path length to go to target with a chess knight at pos position, in a chessbord of n x n
     */
    getMinimumMoves = (position, target, n = 8) => {
        // check parameter values
        if (position % 1 !== 0 || position < 0 || position > n * n) {
            throw new Error(`Wrong value of the parameter 'position': ${position}. Expected integer in [0, ${n*n}]`)
        }
        if (target % 1 !== 0 || target < 0 || target > n * n) {
            throw new Error(`Wrong value of the parameter 'target': ${target}. Expected integer in [0, ${n*n}]`)
        }
        if (target % 1 !== 0 || n < 3) {
            throw new Error(`Wrong value of the parameter 'n': ${n}. Expected integer >= 3`)
        }

        return this._getMinimumMoves(position, target, n);
    }

    /**
     * Same behavior than the method 'getMinimumMoves' without checking parameter values
     * @param {number} pos knight position cell number
     * @param {number} tar target cell number
     * @param {number} n size of the chessboard
     * @returns path length
     */
    _getMinimumMoves = (pos, tar, n = 8) => {
        // for simplicity reasons, I solve simple cases in a grid of 2 around the pos
        if (pos === tar) {
            return 0;
        }

        const posRow = Math.floor((pos - 1) / n);
        const posCol = (pos - 1) % n;
        const tarRow = Math.floor((tar - 1) / n);
        const tarCol = (tar - 1) % n;

        const rowDiff = tarRow - posRow;
        const absRowDiff = Math.abs(rowDiff);
        const colDiff = tarCol - posCol;
        const absColDiff = Math.abs(colDiff);

        if (
            absRowDiff === 2 && absColDiff === 1 ||
            absRowDiff === 1 && absColDiff === 2
        ) {
            return 1;
        }
        if (
            absRowDiff === 2 && absColDiff === 0 ||
            absRowDiff === 0 && absColDiff === 2 ||
            absRowDiff === 1 && absColDiff === 1
        ) {
            return 2;
        }
        if (
            absRowDiff === 1 && absColDiff === 0 ||
            absRowDiff === 0 && absColDiff === 1
        ) {
            return 3;
        }

        if (absRowDiff === 2 && absColDiff === 2) {
            return 4;
        }

        const nextPos = pos + this._getNextPosition(
            absRowDiff,
            { row: rowDiff, col: colDiff },
            { row: posRow, col: posCol },
            { row: tarRow, col: tarCol },
            n,
        );

        return 1 + this._getMinimumMoves(nextPos, tar, n);
    }

    /**
     *
     * @param {number} pos
     * @param {number} tar
     * @param {number} n
     * @returns
     */
    _getNextPosition (
        absRowDiff,
        { row: rowDiff, col: colDiff },
        { row : posRow , col: posCol },
        { row: tarRow, col: tarCol },
        n,
    ) {
        const rowSign = rowDiff === 0 ? (
            // posRow > 0 ? -1 : 1
            posRow < tarRow ? 1 : (posRow > tarRow ? -1 : (posRow > 0 ? -1 : 1))
        ) : Math.sign(rowDiff);
        const colSign = colDiff === 0 ? (
            // posCol > 0 ? -1 : 1
            posCol < tarCol ? 1 : (posCol > tarCol ? -1 : (posCol > 0 ? -1 : 1))
        ) : Math.sign(colDiff);

        if (absRowDiff > 1) {
            return 2 * n * rowSign + colSign;
        }

        return n * rowSign + 2 * colSign;
    }
}

module.exports = PathFinder;
