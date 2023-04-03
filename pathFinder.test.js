const PathFinder = require('./pathFinder');

test('From 1 to 1', () => {
    const finder = new PathFinder(1, 1);
    expect(finder.getMinimumMoves()).toBe(0);
});

test('From 19 to 53', () => {
    const finder = new PathFinder(19, 53);
    expect(finder.getMinimumMoves()).toBe(2);
});

test('From 1 to 64', () => {
    const finder = new PathFinder(1, 64);
    expect(finder.getMinimumMoves()).toBe(6);
});

test('From 50 to 20', () => {
    const finder = new PathFinder(50, 20);
    expect(finder.getMinimumMoves()).toBe(2);
});

test('From 50 to 51', () => {
    const finder = new PathFinder(50, 51);
    expect(finder.getMinimumMoves()).toBe(3);
});

test('Knight in a corner', () => {
    const finder = new PathFinder(1, 10);
    expect(finder.getMinimumMoves()).toBe(4);
});

test('Min edge size', () => {
    const finder = new PathFinder(13, 6, edge=5);
    expect(finder.getMinimumMoves()).toBe(1);
});
