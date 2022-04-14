class PathFinder {
    MOVES = [-15, -17, 17, 15, -6, 10, +6, -10];
    moveInAnydirection(pos, MOVES) {
        let resultMove = [];
        MOVES.forEach(num => {
            resultMove.push(num + pos)
        })
        return resultMove
    };
    sortOutOfBounds(resultMove) {
        let resultMinusOutOfBounds = [];
        resultMove.map((newPos => {
            if (newPos > (8*8)) return
            if (newPos < (8/8)) return
            resultMinusOutOfBounds.push(newPos)
        }))
        return resultMinusOutOfBounds
    };
    sortByCol(pos, resultMinusOutOfBounds) {
        let colPos = pos % 8;
        switch (true) {
            case (colPos === (8 / 8)):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % 8 === ((colPos + 1) % 8) || newPos % 8 === ((colPos + 2) % 8) // Left impossible, +2 right MAX
                }));
            case ((colPos) === (8 / 8) + 1):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % 8 === ((colPos - 1) % 8) || newPos % 8 === ((colPos + 1) % 8) || newPos % 8 === ((colPos + 2) % 8) // -1 Left Max, +2 Right Max
                }));
            case ((colPos) === (8 - 1)):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % 8 === ((colPos - 2) % 8) || newPos % 8 === ((colPos - 1) % 8) || newPos % 8 === ((colPos + 1) % 8) // -2 Left max, +1 Right Max
                }));
            case ((colPos) === 0):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % 8 === ((colPos + 8 - 2) % 8) || newPos % 8 === ((colPos + 8 - 1) % 8) // Right impossible , -2 Left Max
                }));
            default:
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % 8 === ((colPos - 2) % 8) || newPos % 8 === ((colPos - 1) % 8) || newPos % 8 === ((colPos + 1) % 8) || newPos % ((colPos + 2) % 8) === 5 // -2 Left Max, +2 Right Max
                }));
        };
    };
    applyFilterPosByPos(prevPos) {
        let result = []
        if (typeof prevPos !== "number") {
            prevPos.forEach((pos => {
                let newPos = (this.moveInAnydirection(pos, this.MOVES))
                let newPosSortByOut = this.sortOutOfBounds(newPos)
                let newPosSortByCol = this.sortByCol(pos, newPosSortByOut)
                result.push(newPosSortByCol)
            }))
        } else {
            let newPos = (this.moveInAnydirection(prevPos, this.MOVES))
            let newPosSortByOut = this.sortOutOfBounds(newPos)
            let newPosSortByCol = this.sortByCol(prevPos, newPosSortByOut)
            result.push(newPosSortByCol)
        }
        return result
    };
    flatAndDeleteDoubleValue(arr) {
        let flatArr = arr.flat(arr.length)
        let arrWithoutDouble = [...new Set(flatArr)]
        return arrWithoutDouble
    };
    game(position, target, compteur, INITPOS) {
        if (position == target) return 0;
        let filterMove = this.applyFilterPosByPos(position)
        let resultMove = this.flatAndDeleteDoubleValue(filterMove)
        console.log({ resultMove });
        if (resultMove.includes(target)) {
            console.log(`Le minimum de coup pour atteindre ${target} depuis ${INITPOS} est ${compteur} `)
            return compteur
        } else {
            compteur++
            return this.game(resultMove, target, compteur, INITPOS)
        }
    };
    getMinimumMoves = (position, target) => {
        const INITPOS = position
        let compteur = 1;
        return this.game(position, target, compteur, INITPOS)
    }
}
let myPathFinder = new PathFinder();
console.log(myPathFinder.getMinimumMoves(1, 64));

module.exports = PathFinder;