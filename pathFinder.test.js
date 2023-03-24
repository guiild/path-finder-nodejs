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



test('From 1 to 14', () => {
    const finder = new PathFinder(4);
    expect(finder.getMinimumMoves(1, 14)).toBe(2);
});



test('From 12 to 67', () => {
    const finder = new PathFinder(10);
    expect(finder.getMinimumMoves(12, 67)).toBe(4);
});
