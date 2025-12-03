import { readFileSync } from 'fs';

type Battery = {
  banks: string[];
};

function getParsedInput(file: string): Battery {
  const input = readFileSync(file, 'utf8').split('\r\n');
  return {
    banks: input,
  };
}

function maxNumberInBank(bank: string, n: number): string {
  const numberList = bank.split('').map(Number);

  let highestNumber = 0;
  let highestNumberIndex = 0;

  for (let i = 0; i <= bank.length - n; i++) {
    if (numberList[i] > highestNumber) {
      highestNumber = numberList[i];
      highestNumberIndex = i;
    }
  }

  if (n === 1) {
    return highestNumber.toString();
  } else {
    return highestNumber.toString() + maxNumberInBank(bank.slice(highestNumberIndex + 1), n - 1);
  }
}

function part_01() {
  const parsedInput = getParsedInput('./src/day_03.txt');

  const answer = parsedInput.banks.reduce(
    (acc, bank) => (acc += parseInt(maxNumberInBank(bank, 2))),
    0,
  );

  console.log('Part_01 answer: ', answer);
}

function part_02() {
  const parsedInput = getParsedInput('./src/day_03.txt');

  const answer = parsedInput.banks.reduce(
    (acc, bank) => (acc += parseInt(maxNumberInBank(bank, 12))),
    0,
  );

  console.log('Part_02 answer: ', answer);
}

part_01(); // 0.515 ms
part_02(); // 0.950 ms
