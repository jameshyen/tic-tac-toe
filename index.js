// https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let userSwitch = false; // X is false, O is true.
let inPlay = true;

const blank = [
  ['_', '_', '_'],
  ['_', '_', '_'],
  ['_', '_', '_'],
];

let board = [];

const wipeBoard = () => {
  board = [];
  blank.forEach((row) => {
    board.push(row.slice())
  });
};

const player = () => userSwitch ? 'O' : 'X';

const checkRows = () =>
  board[0][0] !== '_' && board[0][0] === board[0][1] && board[0][1] === board[0][2] ||
  board[1][0] !== '_' && board[1][0] === board[1][1] && board[1][1] === board[1][2] ||
  board[2][0] !== '_' && board[2][0] === board[2][1] && board[2][1] === board[2][2];

const checkColumns = () =>
  board[0][0] !== '_' && board[0][0] === board[1][0] && board[1][0] === board[2][0] ||
  board[0][1] !== '_' && board[0][1] === board[1][1] && board[1][1] === board[2][1] ||
  board[0][2] !== '_' && board[0][2] === board[1][2] && board[1][2] === board[2][2];

const checkDiagonals = () =>
  board[0][0] !== '_' && board[0][0] === board[1][1] && board[1][1] === board[2][2] ||
  board[2][0] !== '_' && board[2][0] === board[1][1] && board[1][1] === board[0][2];

const checkWin = () => checkRows() || checkColumns() || checkDiagonals();

const printBoard = () => {
  const playerName = player();
  console.log('Board:\n');
  board.forEach((row) => {
    row.forEach((piece) => {
      process.stdout.write(`${piece} `);
    });
    process.stdout.write('\n');
  });
  if (checkWin()) {
    userSwitch = !userSwitch;
    inPlay = false;
    console.log(`${player()} wins! Play again? (y/n)`);
  } else {
    console.log(`\n${playerName}'s turn...`);
  }
};

rl.on('line', (command) => {
  if (inPlay) {
    const playerName = player();
    if (/^\d,[ ]?\d$/.test(command)) {
      const matches = command.match(/(\d),[ ]?(\d)/);
      let [_, x, y] = matches;
      x = parseInt(x);
      y = parseInt(y);
      if (x > 3 || x < 1 || y > 3 || y < 1) {
        console.log('Your move is out of bounds!');
      } else {
        x -= 1;
        y -= 1;
        if (board[x][y] === '_') {
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
  } else {
    if (/^[yn]$/.test(command)) {
      if (command === 'y') {
        inPlay = true;
        userSwitch = false;
        wipeBoard();
        printBoard();
      } else {
        process.exit();
      }
    } else {
      console.log('Game is over. Play again? (y/n)');
    }
  }
});

wipeBoard();
printBoard();