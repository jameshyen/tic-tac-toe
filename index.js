// https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let userSwitch = false; // Player 1 is false, Player 2 is true.

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const printBoard = () => {
  console.log('Board:');
  board.forEach((row) => {
    row.forEach((piece) => {
      process.stdout.write(`${piece} `);
    });
    process.stdout.write('\n');
  });
};

rl.on('line', (command) => {
  console.log(`User move: ${command}`);
  printBoard();
});