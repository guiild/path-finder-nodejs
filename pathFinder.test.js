const PathFinder = require('./pathFinder');

// case 0
test('From 1 to 1', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(1, 1)).toBe(0);
});

// case 1
test('From 20 to 30, and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 30)).toBe(1);
    expect(finder.getMinimumMoves(30, 20)).toBe(1);
});

test('From 20 to 26 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 26)).toBe(1);
    expect(finder.getMinimumMoves(26, 20)).toBe(1);
});

test('From 20 to 35 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 35)).toBe(1);
    expect(finder.getMinimumMoves(35, 20)).toBe(1);
});

test('From 20 to 37 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 37)).toBe(1);
    expect(finder.getMinimumMoves(37, 20)).toBe(1);
});

// case 2
test('From 20 to 22 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 22)).toBe(2);
    expect(finder.getMinimumMoves(22, 20)).toBe(2);
});

test('From 20 to 36 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 36)).toBe(2);
    expect(finder.getMinimumMoves(36, 20)).toBe(2);
});

test('From 20 to 29 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 29)).toBe(2);
    expect(finder.getMinimumMoves(29, 20)).toBe(2);
});

test('From 20 to 27 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 27)).toBe(2);
    expect(finder.getMinimumMoves(27, 20)).toBe(2);
});

// case 3
test('From 20 to 21 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 21)).toBe(3);
    expect(finder.getMinimumMoves(21, 20)).toBe(3);
});

test('From 20 to 28 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 28)).toBe(3);
    expect(finder.getMinimumMoves(28, 20)).toBe(3);
});

// case 4
test('From 20 to 38 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 38)).toBe(4);
    expect(finder.getMinimumMoves(38, 20)).toBe(4);
});

test('From 20 to 34 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(20, 34)).toBe(4);
    expect(finder.getMinimumMoves(34, 20)).toBe(4);
});

// legacy tests
test('From 19 to 53 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(19, 53)).toBe(2);
    expect(finder.getMinimumMoves(53, 19)).toBe(2);
});

test('From 1 to 64 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(1, 64)).toBe(6);
    expect(finder.getMinimumMoves(64, 1)).toBe(6);
});

test('From 50 to 20 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(50, 20)).toBe(2);
    expect(finder.getMinimumMoves(20, 50)).toBe(2);
});

test('From 50 to 51 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(50, 51)).toBe(3);
    expect(finder.getMinimumMoves(51, 50)).toBe(3);
});

// larger grids
test('From 1 to 81 and the opposite', () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(1, 81, 65)).toBe(10);
    expect(finder.getMinimumMoves(81, 1, 65)).toBe(10);
});

// wrong position value
test('Check negative position value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(-1, 1, 1)).toThrow("Wrong value of the parameter 'position': -1. Expected integer in [0, 1]");
});

test('Check float position value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(1.2, 1, 1)).toThrow("Wrong value of the parameter 'position': 1.2. Expected integer in [0, 1]");
});

test('Check oversize position value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(2, 1, 1)).toThrow("Wrong value of the parameter 'position': 2. Expected integer in [0, 1]");
});

// wrong target value
test('Check negative target value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(1, -1, 1)).toThrow("Wrong value of the parameter 'target': -1. Expected integer in [0, 1]");
});

test('Check float target value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(1, 1.2, 1)).toThrow("Wrong value of the parameter 'target': 1.2. Expected integer in [0, 1]");
});

test('Check oversize target value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(1, 2, 1)).toThrow("Wrong value of the parameter 'target': 2. Expected integer in [0, 1]");
});

// wrong n value
test('Check negative n value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(1, 1, -1)).toThrow("Wrong value of the parameter 'n': -1. Expected integer >= 3");
});

test('Check float n value', () => {
    const finder = new PathFinder();
    expect(() => finder.getMinimumMoves(1, 1, 1.2)).toThrow("Wrong value of the parameter 'n': 1.2. Expected integer >= 3");
});
