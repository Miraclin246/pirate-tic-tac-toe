const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const catX = document.getElementById('cat-x');
const catO = document.getElementById('cat-o');

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', cellClicked));
restartBtn.addEventListener('click', restartGame);

function cellClicked() {
  const index = this.dataset.index;
  if(board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.style.backgroundImage = currentPlayer === 'X' 
    ? "url('images/X.png')" 
    : "url('images/O.png')";

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for(let condition of winConditions) {
    const [a,b,c] = condition;
    if(board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if(roundWon) {
    statusText.textContent = `🏆 Player ${currentPlayer} wins the treasure!`;
    running = false;
    updateCatsOnWin(currentPlayer);
  } else if(!board.includes("")) {
    statusText.textContent = "🤝 It’s a draw, ye scallywags!";
    running = false;
    updateCatsOnDraw();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}’s turn, matey!`;
  }
}

function updateCatsOnWin(winner) {
  if(winner === 'X') {
    catX.src = "images/catX_happy.png";
    catO.src = "images/catO_sad.png";
    setTimeout(() => {
      catX.src = "images/catX_encouraging.png";
    }, 2000);
  } else {
    catO.src = "images/catO_happy.png";
    catX.src = "images/catX_sad.png";
    setTimeout(() => {
      catO.src = "images/catO_encouraging.png";
    }, 2000);
  }
}

function updateCatsOnDraw() {
  catX.src = "images/catX_sheepish.png";
  catO.src = "images/catO_sheepish.png";
}

function restartGame() {
  currentPlayer = 'X';
  board = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X’s turn, matey!";
  cells.forEach(cell => {
    cell.style.backgroundImage = "";
  });
  catX.src = "images/catX_normal.png";
  catO.src = "images/catO_normal.png";
  running = true;
}
