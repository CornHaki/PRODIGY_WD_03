// Game State
const board = Array(9).fill("");
let currentPlayer = "X";
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

// DOM Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

// Winning Conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Update Status
function updateStatus(message) {
  statusText.textContent = message;
  document.title = `Tic-Tac-Toe | ${message}`;
}

// Highlight Winning Cells
function highlightWinningCells(condition) {
  condition.forEach(index => cells[index].classList.add("winning"));
}

// Check for Winner
function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      updateStatus(`Player ${board[a]} Wins!`);
      isGameActive = false;
      highlightWinningCells(condition);
      if (board[a] === "X") scoreX++;
      else scoreO++;
      updateScores();
      return;
    }
  }

  if (!board.includes("")) {
    updateStatus("It's a Draw!");
    isGameActive = false;
  }
}

// Update Scores
function updateScores() {
  scoreXText.textContent = scoreX;
  scoreOText.textContent = scoreO;
}

// Handle Cell Click
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (board[index] === "" && isGameActive) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");
    checkWinner();
    if (isGameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatus(`Player ${currentPlayer}'s turn`);
    }
  }
}

// Reset Game
function resetGame() {
  board.fill("");
  currentPlayer = "X";
  isGameActive = true;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
  updateStatus("Player X's turn");
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
