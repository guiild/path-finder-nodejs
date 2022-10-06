const { isEqual, sortBy } = require("lodash");
const PathFinder = require("./pathFinder");

describe("getMinimumMoves()", () => {
  test("From 1 to 1", () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(1, 1)).toBe(0);
  });

  test("From 19 to 53", () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(19, 53)).toBe(2);
  });

  test("From 1 to 64", () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(1, 64)).toBe(6);
  });

  test("From 50 to 20", () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(50, 20)).toBe(2);
  });

  test("From 50 to 51", () => {
    const finder = new PathFinder();
    expect(finder.getMinimumMoves(50, 51)).toBe(3);
  });
});

describe("left()", () => {
  test("From 20", () => {
    const finder = new PathFinder();
    expect(finder.left(20)).toBe(19);
  });
  test("From 9", () => {
    const finder = new PathFinder();
    expect(finder.left(9)).toBe(-1);
  });
});

describe("right()", () => {
  test("From 20", () => {
    const finder = new PathFinder();
    expect(finder.right(20)).toBe(21);
  });
  test("From 16", () => {
    const finder = new PathFinder();
    expect(finder.right(16)).toBe(-1);
  });
});

describe("up()", () => {
  test("From 20", () => {
    const finder = new PathFinder();
    expect(finder.up(20)).toBe(12);
  });
  test("From 5", () => {
    const finder = new PathFinder();
    expect(finder.up(5)).toBe(-1);
  });
});

describe("up()", () => {
  test("From 20", () => {
    const finder = new PathFinder();
    expect(finder.up(20)).toBe(12);
  });
  test("From 61", () => {
    const finder = new PathFinder();
    expect(finder.up(5)).toBe(-1);
  });
});

describe("down()", () => {
  test("From 20", () => {
    const finder = new PathFinder();
    expect(finder.down(20)).toBe(28);
  });
  test("From 61", () => {
    const finder = new PathFinder();
    expect(finder.down(61)).toBe(-1);
  });
});

describe("getLegalMoves()", () => {
  test("From 20", () => {
    const finder = new PathFinder();
    const arrayEquality = isEqual(
      sortBy(finder.getLegalMoves(20)),
      [3, 5, 10, 14, 26, 30, 35, 37]
    );
    expect(arrayEquality).toBeTruthy();
  });
  test("From 61", () => {
    const finder = new PathFinder();
    console.log(finder.getLegalMoves(61));
    const arrayEquality = isEqual(
      sortBy(finder.getLegalMoves(61)),
      [44, 46, 51, 55]
    );
    expect(arrayEquality).toBeTruthy();
  });
});
