import { readFileSync } from 'fs';

type Grid = string[][];

function getParsedInput(file: string): Grid {
  return readFileSync(file, 'utf8')
    .split('\r\n')
    .map((line) => line.split(''));
}

const SHIFT_ARRAY = [
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

function removeRolls(grid: Grid): { removedRolls: number; newGrid: Grid } {
  const clonedGrid = grid.map((row) => [...row]);

  const summedGrid: number[][] = Array.from({ length: clonedGrid.length }, () =>
    Array(clonedGrid[0].length).fill(0),
  );

  for (const shift of SHIFT_ARRAY) {
    for (
      let y = Math.max(0, -shift.y);
      y < Math.min(summedGrid.length, summedGrid.length - shift.y);
      y++
    ) {
      for (
        let x = Math.max(0, -shift.x);
        x < Math.min(summedGrid[y].length, summedGrid[y].length - shift.x);
        x++
      ) {
        const shiftedElement = clonedGrid[y + shift.y][x + shift.x];
        if (shiftedElement === '@') {
          summedGrid[y][x] += 1;
        }
      }
    }
  }

  let removedRolls = 0;

  for (let y = 0; y < clonedGrid.length; y++) {
    for (let x = 0; x < clonedGrid[y].length; x++) {
      if (clonedGrid[y][x] === '@' && summedGrid[y][x] < 4) {
        removedRolls++;
        clonedGrid[y][x] = 'X';
      }
    }
  }

  return { removedRolls: removedRolls, newGrid: clonedGrid };
}

function part_01() {
  const parsedInput = getParsedInput('./src/day_04.txt');

  const answer = removeRolls(parsedInput).removedRolls;

  console.log('Part_01 answer: ', answer);
}

function part_02() {
  const parsedInput = getParsedInput('./src/day_04.txt');

  let removedRollsTotal = 0;
  let lastRemovedRollsState = 0;
  let lastGridState = parsedInput;

  do {
    const { removedRolls, newGrid } = removeRolls(lastGridState);
    removedRollsTotal += removedRolls;
    lastRemovedRollsState = removedRolls;
    lastGridState = newGrid;
  } while (lastRemovedRollsState > 0);

  console.log('Part_02 answer: ', removedRollsTotal);
}

part_01(); // 3.9 ms
part_02(); // 62.5 ms
