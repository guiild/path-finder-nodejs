const { isEqual, sortBy } = require("lodash");
const Board = require("./Board");

describe("left()", () => {
  test("From 20", () => {
    const board = new Board();
    expect(board.left(20)).toBe(19);
  });
  test("From 9", () => {
    const board = new Board();
    expect(board.left(9)).toBe(-1);
  });
});

describe("right()", () => {
  test("From 20", () => {
    const board = new Board();
    expect(board.right(20)).toBe(21);
  });
  test("From 16", () => {
    const board = new Board();
    expect(board.right(16)).toBe(-1);
  });
});

describe("up()", () => {
  test("From 20", () => {
    const board = new Board();
    expect(board.up(20)).toBe(12);
  });
  test("From 5", () => {
    const board = new Board();
    expect(board.up(5)).toBe(-1);
  });
});

describe("up()", () => {
  test("From 20", () => {
    const board = new Board();
    expect(board.up(20)).toBe(12);
  });
  test("From 61", () => {
    const board = new Board();
    expect(board.up(5)).toBe(-1);
  });
});

describe("down()", () => {
  test("From 20", () => {
    const board = new Board();
    expect(board.down(20)).toBe(28);
  });
  test("From 61", () => {
    const board = new Board();
    expect(board.down(61)).toBe(-1);
  });
});

describe("getLegalMoves()", () => {
  test("From 20", () => {
    const board = new Board();
    const arrayEquality = isEqual(
      sortBy(board.getLegalMoves(20)),
      [3, 5, 10, 14, 26, 30, 35, 37]
    );
    expect(arrayEquality).toBeTruthy();
  });
  test("From 61", () => {
    const board = new Board();
    const arrayEquality = isEqual(
      sortBy(board.getLegalMoves(61)),
      [44, 46, 51, 55]
    );
    expect(arrayEquality).toBeTruthy();
  });
});
