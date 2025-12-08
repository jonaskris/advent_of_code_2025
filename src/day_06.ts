import { readFileSync } from 'fs';

type Problem = {
  operands: string[];
  operation: '+' | '*';
};

function getParsedInput(file: string): Problem[] {
  let rows = readFileSync(file, 'utf8').split('\r\n');

  const columns: string[][] = [];

  while (rows[rows.length - 1].includes('+') || rows[rows.length - 1].includes('*')) {
    let rowLength = rows[rows.length - 1].slice(1).search(/\S/);
    if (rowLength === -1) rowLength = rows[rows.length - 1].length;
    columns.push(rows.map((row) => row.slice(0, rowLength)));
    rows = rows.map((row) => row.slice(rowLength + 1));
  }

  return columns.map((column) => ({
    operands: column.slice(0, column.length - 1),
    operation: column[column.length - 1][0] as '+' | '*',
  }));
}

function part_01() {
  const parsedInput = getParsedInput('./src/day_06.txt');

  const problemAnswers = parsedInput.map((problem) =>
    problem.operands
      .map(Number)
      .slice(1)
      .reduce(
        (acc, number) => (problem.operation === '+' ? acc + number : acc * number),
        Number(problem.operands[0]),
      ),
  );

  const answer = problemAnswers.reduce((acc, problemAnswer) => {
    return acc + problemAnswer;
  }, 0);

  console.log('Part_01 answer: ', answer);
}

function part_02() {
  const parsedInput = getParsedInput('./src/day_06.txt');

  const transformedProblems = parsedInput.map((problem) => {
    const columnsLength = problem.operands[0].length;

    const transformedOperands: string[] = [];

    for (let i = 0; i < columnsLength; i++) {
      transformedOperands.push(problem.operands.map((operand) => operand[i]).join(''));
    }

    return { operands: transformedOperands, operation: problem.operation };
  });

  const problemAnswers = transformedProblems.map((problem) =>
    problem.operands
      .map(Number)
      .slice(1)
      .reduce(
        (acc, number) => (problem.operation === '+' ? acc + number : acc * number),
        Number(problem.operands[0]),
      ),
  );

  const answer = problemAnswers.reduce((acc, problemAnswer) => {
    return acc + problemAnswer;
  }, 0);

  console.log('Part_02 answer: ', answer);
}

part_01(); // 0.4 ms
part_02(); // 0.9 ms
