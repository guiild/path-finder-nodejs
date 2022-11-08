function splitOnXYPosition(position, size) {
    let cpt = 0;
    let i = 1
    for (i; i <= position; i = i + size) {
        cpt++;
    }
    return {x: cpt - 1, y: position - (i - size), deep: 0}
}

function isValid(x, y, size) {
    return (x >= 0 && x < size) && (y >= 0 && y < size)
}

function alreadyInQueue(queue, x, y) {
    return queue.find(elem => elem.x === x && elem.y === y) !== undefined
}

class PathFinder {
    getMinimumMoves = (position, target, size = 8) => {
        const moves = [{x: 2, y: -1}, {x: 2, y: 1}, {x: -2, y: -1}, {x: -2, y: 1}, {x: 1, y: 2}, {x: 1, y: -2}, {x: -1, y: 2}, {x: -1, y: -2}];
        target = splitOnXYPosition(target, size)
        position = splitOnXYPosition(position, size)
        const queue = [position]

        if (!isValid(position.x, position.y, size) || !isValid(target.x, target.y, size)) {
            throw new Error('Position or Target not in Board')
        }

        while (queue.length > 0) {
            let q = queue.shift()

            if (q.x === target.x && q.y === target.y) return q.deep

            for (let move of moves) {
                const newPos = {x: q.x + move.x, y: q.y + move.y, deep: q.deep + 1}
                if (isValid(newPos.x, newPos.y, size) && !alreadyInQueue(queue, newPos.x, newPos.y)) {
                    queue.push(newPos);
                }
            }
        }
        throw new Error('No path found')
    }
}

module.exports = PathFinder;