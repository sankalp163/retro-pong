import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const scoreBox = document.getElementById("score");
const menuText = document.getElementById("menu-content");
const restartButton = document.getElementById("restart-button");
// const playPause = document.getElementById("play-pause");

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;

    //Following line of code ensures gradual change of hue
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
    //Update code
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    if (isLose()) handleLose();

    if (isGameOver()) handleGameOver();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }

  ball.reset();
  playerPaddle.reset();
  computerPaddle.reset();
}

// Function to check whether someone is won or not.
function isGameOver() {
  const playerScore = parseInt(playerScoreElem.textContent);
  const computerScore = parseInt(computerScoreElem.textContent);

  return playerScore == 5 || computerScore == 5;
}

// Function to determine what has to be displayed after game is over
function handleGameOver() {
  const playerScore = parseInt(playerScoreElem.textContent);
  document.getElementById("menu").style.visibility = "visible";
  document.getElementById("vl").style.visibility = "hidden";
  scoreBox.style.visibility = "hidden";

  if (playerScore == 5) {
    menuText.textContent = "You win :D";
  } else {
    menuText.textContent = "You Lose :( ";
  }

  ball.reset();
  playerPaddle.reset();
  computerPaddle.reset();
}
// Event listener for play and pause button
// playPause.addEventListener("click", () => {
//   if (playPause.textContent == "||") {
//     playPause.textContent = ">>";
//   } else {
//     playPause.textContent = "||";
//   }
// });

// Event Listener to restart the game
restartButton.addEventListener("click", () => {
  playerScoreElem.textContent = 0;
  computerScoreElem.textContent = 0;
  document.getElementById("menu").style.visibility = "hidden";
  document.getElementById("vl").style.visibility = "visible";
  scoreBox.style.visibility = "visible";

  ball.reset();
  playerPaddle.reset();
  computerPaddle.reset();
  // console.log("Clicked")
});
// Event Listener for movement of player paddle
document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

/* The window.requestAnimationFrame() method tells
the browser that you wish to perform an animation
and requests that the browser calls a specified
function to update an animation before the next
repaint. The method takes a callback as an argument
to be invoked before the repaint */
window.requestAnimationFrame(update);
