import { readFileSync } from 'fs';

type Inventory = {
  ranges: [number, number][];
  ingredients: number[];
};

function getParsedInput(file: string): Inventory {
  const parts = readFileSync(file, 'utf8').split('\r\n\r\n');
  const ranges = parts[0];
  const ingredients = parts[1];

  return {
    ranges: ranges.split('\r\n').map((rangeStr) => rangeStr.split('-').map(Number)) as [
      number,
      number,
    ][],
    ingredients: ingredients.split('\r\n').map(Number),
  };
}

function part_01() {
  const parsedInput = getParsedInput('./src/day_05.txt');

  const answer = parsedInput.ingredients.reduce(
    (acc, ingredient) =>
      parsedInput.ranges.some(
        ([rangeStart, rangeEnd]) => ingredient >= rangeStart && ingredient <= rangeEnd,
      )
        ? acc + 1
        : acc,
    0,
  );

  console.log('Part_01 answer: ', answer);
}

function doRangesIntersect(first: [number, number], second: [number, number]): boolean {
  const [a1, a2] = first;
  const [b1, b2] = second;

  const startA = Math.min(a1, a2);
  const endA = Math.max(a1, a2);
  const startB = Math.min(b1, b2);
  const endB = Math.max(b1, b2);

  return startA <= endB && startB <= endA;
}

function part_02() {
  const parsedInput = getParsedInput('./src/day_05.txt');

  const dedupedRanges = parsedInput.ranges.reduce(
    (acc, [start, end]) => {
      let mergedStart = start;
      let mergedEnd = end;

      for (let i = 0; i < acc.length; i++) {
        const [s, e] = acc[i];

        if (doRangesIntersect([mergedStart, mergedEnd], [s, e])) {
          mergedStart = Math.min(mergedStart, s);
          mergedEnd = Math.max(mergedEnd, e);
          acc.splice(i, 1);
          i--;
        }
      }

      acc.push([mergedStart, mergedEnd]);
      return acc;
    },
    [] as [number, number][],
  );

  const answer = dedupedRanges.reduce((acc, [start, end]) => (acc += end - start + 1), 0);

  console.log('Part_02 answer: ', answer);
}

part_01(); // 2.1 ms
part_02(); // 1.5 ms
