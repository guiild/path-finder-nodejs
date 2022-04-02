# guiild js
## Level 2: Path finder
## Context
You are given a **8x8** cells square with a number assigned to each cell following the pattern bellow:
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
| 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
| 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 |
| 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
| 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 |
| 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 |
| 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 |

Your need to find the best path (minimum of moves) from any initial position to a target which can also be anywhere in square.

However, you can only move following the 8 moves of a chess knight (2 in one direction, then 1 in a perpendicular one) like this:

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
| 17 | 18 |  <span style="color:red">**-**</span> | 20 |  <span style="color:red">**-**</span> | 22 | 23 | 24 |
| 25 |  <span style="color:red">**-**</span> | 27 | 28 | 29 |  <span style="color:red">**-**</span> | 31 | 32 |
| 33 | 34 | 35 | <span style="color:red">**You**</span> | 37 | 38 | 39 | 40 |
| 41 |  <span style="color:red">**-**</span> | 43 | 44 | 45 |  <span style="color:red">**-**</span> | 47 | 48 |
| 49 | 50 |  <span style="color:red">**-**</span> | 52 |  <span style="color:red">**-**</span> | 54 | 55 | 56 |
| 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 |


## First task
In *pathFinder.js*, implement the method:
- `getMinimumMoves = (position: number, target: number) => minimumMoves: number `: that take the initial position as a number of the grid and the target position.

exemple:
- getMinimumMoves(1, 1) => 0
- getMinimumMoves(19, 53) => 2

## Second task
Extend your solution to a NxN board 

## Submit
Fork the project on Github and submit a merge request when you are ready.

## Test
Unit test can be found in *pathFinder.test.js*. If you think some are missing, you can add yours.

You can use docker to run your test in a controled environment

`docker build . -t node16 && docker run -it --rm node16`

or directly using npm:

`npm test`
