import { readFileSync } from 'fs';

type TachyonManifold = {
  startIndex: number;
  rowSplitterIndices: number[][];
};

function getParsedInput(file: string): TachyonManifold {
  let rows = readFileSync(file, 'utf8').split('\r\n');

  return {
    startIndex: rows[0].indexOf('S'),
    rowSplitterIndices: rows.map((row) =>
      row.split('').reduce((acc, char, index) => {
        if (char === '^') acc.push(index);
        return acc;
      }, [] as number[]),
    ),
  };
}

function part_01() {
  const parsedInput = getParsedInput('./src/day_07.txt');

  let beams: number[] = [parsedInput.startIndex];
  let answer = 0;

  for (let i = 0; i < parsedInput.rowSplitterIndices.length; i++) {
    const newBeams = new Set<number>();
    const currentRow = parsedInput.rowSplitterIndices[i];

    for (let j = 0; j < beams.length; j++) {
      if (currentRow.includes(beams[j])) {
        newBeams.add(beams[j] - 1);
        newBeams.add(beams[j] + 1);
        answer++;
      } else {
        newBeams.add(beams[j]);
      }
    }

    beams = Array.from(newBeams);
  }

  console.log('Part_01 answer: ', answer);
}

function part_02() {
  const parsedInput = getParsedInput('./src/day_07.txt');

  let beamIndices: { index: number; count: number }[] = [
    { index: parsedInput.startIndex, count: 1 },
  ];

  let answer = 1;

  for (let i = 0; i < parsedInput.rowSplitterIndices.length; i++) {
    const newBeamIndices: { index: number; count: number }[] = [];
    const currentRow = parsedInput.rowSplitterIndices[i];

    for (let j = 0; j < beamIndices.length; j++) {
      if (currentRow.includes(beamIndices[j].index)) {
        answer += beamIndices[j].count;

        const existingBeamAtMinusOne = newBeamIndices.findIndex(
          (beam) => beam.index === beamIndices[j].index - 1,
        );
        const existingBeamAtPlusOne = newBeamIndices.findIndex(
          (beam) => beam.index === beamIndices[j].index + 1,
        );

        if (existingBeamAtMinusOne !== -1) {
          newBeamIndices[existingBeamAtMinusOne].count += beamIndices[j].count;
        } else {
          newBeamIndices.push({ index: beamIndices[j].index - 1, count: beamIndices[j].count });
        }

        if (existingBeamAtPlusOne !== -1) {
          newBeamIndices[existingBeamAtPlusOne].count += beamIndices[j].count;
        } else {
          newBeamIndices.push({ index: beamIndices[j].index + 1, count: beamIndices[j].count });
        }
      } else {
        const existingBeam = newBeamIndices.findIndex(
          (beam) => beam.index === beamIndices[j].index,
        );

        if (existingBeam !== -1) {
          newBeamIndices[existingBeam].count += beamIndices[j].count;
        } else {
          newBeamIndices.push(beamIndices[j]);
        }
      }
    }

    beamIndices = newBeamIndices;
  }

  console.log('Part_02 answer: ', answer);
}

part_01(); // 0.5 ms
part_02(); // 2.4 ms
