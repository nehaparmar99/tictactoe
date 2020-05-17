const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellelements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMsgTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn; //if true circle turn else xs turn

// cellelements.forEach((cell) => {
//   cell.addEventListener("click", handleClick, { once: true });
// });
//once:true means once we click on a cell dont fire it again,which means if we click a box again it does not handle the click,that is avoid overwriting
startgame();
//FIRST TURN

restartButton.addEventListener("click", startgame);

function startgame() {
  circleTurn = false;
  cellelements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  //for unsetting on restart button
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  //   console.log("clicked");
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //placeMark
  placeMark(cell, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    // console.log("winner");
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
  //check for draw
  //switch turns
  //to add hover effects after turn is swapped,so as whose is current turn
}

function endGame(draw) {
  if (draw) {
    winningMsgTextElement.innerText = " Draw!";
  } else {
    const wins = circleTurn ? "O's" : "X's";
    winningMsgTextElement.innerText = wins + " Wins!";
  }
  winningMessageElement.classList.add("show");
}
function isDraw() {
  //all cell elements filled,cell elemetns dont have an every method therefore we have to destructure it

  return [...cellelements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellelements[index].classList.contains(currentClass);
    });
  });
}
