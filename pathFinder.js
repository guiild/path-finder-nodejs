class PathFinder {
    getMinimumMoves = (position, target, n = 8) => {
        if (position === target) {
            return 0;
        }
        const absDiff = Math.abs(position - target)
        if ([n+2, n-2, 2*n-1, 2*n+1].find(v => absDiff === v)) {
            return 1;
        }
        if ([2, 2*n, n+1, n-1].find(v => absDiff === v)) {
            return 2;
        }
        if ([1, n].find(v => absDiff === v)) {
            return 3;
        }
        if ([2*n+2, 2*n-2].find(v => absDiff === v)) {
            return 4;
        }

        return 1 + this.getMinimumMoves(this.getNextPosition(position, target, n), target, n);
    }

    getNextPosition (position, target, n) {
        const posRow = Math.floor((position - 1) / n);
        const posCol = (position - 1) % n;
        const tarRow = Math.floor((target - 1) / n);
        const tarCol = (target - 1) % n;

        const rowDiff = tarRow - posRow;
        const absRowDiff = Math.min(2, Math.abs(rowDiff));
        const colDiff = tarCol - posCol;

        const rowSign = rowDiff === 0 ? (posRow > 0 ? -1 : 1) : Math.sign(rowDiff);
        const colSign = colDiff === 0 ? (posCol > 0 ? -1 : 1) : Math.sign(colDiff);

        if (absRowDiff) {
            return position + 2 * n * rowSign + colSign;
        }

        return position + n * rowSign + 2 * colSign;
    }
}

module.exports = PathFinder;