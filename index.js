// https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let userSwitch = false; // X is false, O is true.

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const player = () => userSwitch ? 'O' : 'X';

const printBoard = () => {
  const playerName = player();
  console.log('Board:\n');
  board.forEach((row) => {
    row.forEach((piece) => {
      process.stdout.write(`${piece} `);
    });
    process.stdout.write('\n');
  });
  console.log(`\n${playerName}'s turn...`);
};

rl.on('line', (command) => {
  const playerName = player();
  if (/\d,[ ]?\d/.test(command)) {
    const matches = command.match(/(\d),[ ]?(\d)/);
    let [_, x, y] = matches;
    x = parseInt(x);
    y = parseInt(y);
    if (x > 3 || x < 1 || y > 3 || y < 1) {
      console.log('Your move is out of bounds!');
    } else {
      x -= 1;
      y -= 1;
      if (!board[x][y]) {
        board[x][y] = playerName;
        console.log(`\n${playerName} does: ${command}\n`);
        userSwitch = !userSwitch;
        printBoard();
      } else {
        console.log('That spot is taken.');
      }
    }
  } else {
    console.log('Place your move using the following command: x, y.');
  }
});