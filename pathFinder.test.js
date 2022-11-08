const PathFinder = require('./pathFinder');

test('From 1 to 1', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(1, 1)).toBe(0);
});

test('From 19 to 53', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(19, 53)).toBe(2);
});

test('From 1 to 64', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(1, 64)).toBe(6);
});

test('From 50 to 20', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(50, 20)).toBe(2);
});

test('From 50 to 51', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(50, 51)).toBe(3);
});

describe('Invalid tests', () => {
    test('From 1 to 66 on 8X8 board', () => {
        const finder = new PathFinder();
        expect(() => finder.getMinimumMoves(1, 66, 8)).toThrow('Position or Target not in Board');
    });

    test('From 66 to 2 on 8X8 board', () => {
        const finder = new PathFinder();
        expect(() => finder.getMinimumMoves(66, 2, 8)).toThrow('Position or Target not in Board');
    });
});
