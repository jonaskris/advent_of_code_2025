import { readFileSync } from 'fs';

type Range = {
  first: number;
  last: number;
};

function getParsedInput(file: string): Range[] {
  const input = readFileSync(file, 'utf8').split(',');
  return input.map((line) => ({
    first: parseInt(line.substring(0, line.indexOf('-') + 1)),
    last: parseInt(line.substring(line.indexOf('-') + 1)),
  }));
}

function part_01() {
  const parsedInput = getParsedInput('./src/day_02.txt');

  const answer = parsedInput.reduce((acc, range) => {
    for (let i = range.first; i <= range.last; i++) {
      const asString = i.toString();
      if (
        asString.substring(0, Math.ceil(asString.length / 2)) ===
        asString.substring(Math.ceil(asString.length / 2))
      )
        acc += i;
    }
    return acc;
  }, 0);

  console.log('Part_01 answer: ', answer);
}

function isInvalid(number: number): boolean {
  const asString = number.toString();
  let currentWidth = 1;

  while (currentWidth <= asString.length / 2) {
    const requiredComparisons = asString.length / currentWidth;

    if (asString === asString.substring(0, currentWidth).repeat(requiredComparisons)) return true;

    do {
      currentWidth += 1;
    } while (asString.length % currentWidth !== 0);
  }

  return false;
}

function part_02() {
  const parsedInput = getParsedInput('./src/day_02.txt');

  const answer = parsedInput.reduce((acc, range) => {
    for (let i = range.first; i <= range.last; i++) {
      if (isInvalid(i)) acc += i;
    }
    return acc;
  }, 0);

  console.log('Part_02 answer: ', answer);
}

part_01(); // 67 ms
part_02(); // 160 ms
