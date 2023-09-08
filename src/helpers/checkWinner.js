import { WIN_CONDITIONS } from "../constants";

function checkWinner(board) {
  for (let rowIndex = 0; rowIndex < WIN_CONDITIONS.length; rowIndex++) {
    const [x, y, z] = WIN_CONDITIONS[rowIndex];
    if (board[x] === board[y] && board[x] === board[z]) {
      if (board[x] === "X" || board[x] === "O") return board[x];
    }
  }
  let count = 0;
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    if (board[rowIndex] === "X" || board[rowIndex] === "O") {
      count++;
    }
  }
  if (count === 9) return "full";
  return null;
}

export default checkWinner;
