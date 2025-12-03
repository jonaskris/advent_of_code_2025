import { readFileSync } from 'fs';

type Rotation = {
  direction: 'L' | 'R';
  distance: number;
};

function getParsedInput(file: string): Rotation[] {
  const input = readFileSync(file, 'utf8').split('\r\n');
  return input.map((line) => ({
    direction: line.slice(0, 1) as 'L' | 'R',
    distance: parseInt(line.slice(1)),
  }));
}

function part_01() {
  let position = 50;
  const parsedInput = getParsedInput('./src/day_01.txt');

  const answer = parsedInput.reduce((acc, rotation) => {
    const change = (rotation.direction === 'L' ? -1 : 1) * rotation.distance;
    position = (((position + change) % 100) + 100) % 100;

    return acc + (position === 0 ? 1 : 0);
  }, 0);

  console.log('Part_01 answer: ', answer);
}

function part_02() {
  let position = 50;
  const parsedInput = getParsedInput('./src/day_01.txt');

  const answer = parsedInput.reduce((acc, rotation) => {
    const change = (rotation.direction === 'L' ? -1 : 1) * rotation.distance;
    const nonModuloNewPosition = position + change;
    const newPosition = ((nonModuloNewPosition % 100) + 100) % 100;

    const timesHitZero =
      rotation.direction === 'L'
        ? Math.abs(Math.trunc((nonModuloNewPosition - 100) / 100)) - (position === 0 ? 1 : 0)
        : Math.abs(Math.trunc(nonModuloNewPosition / 100));

    position = newPosition;
    return acc + timesHitZero;
  }, 0);

  console.log('Part_02 answer: ', answer);
}

part_01(); // 0.220 ms
part_02(); // 0.300 ms
