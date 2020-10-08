(function () {
  var score, currentScore, activePlayer, gameState, winingScore;

  document.addEventListener("DOMContentLoaded", function () {
    onNewGame();
  });
  document.querySelector("#newGame").addEventListener("click", onNewGame);
  document.querySelector("#rollBtn").addEventListener("click", onRollDice);
  document.querySelector("#holdBtn").addEventListener("click", onHold);

  function onNewGame() {
    winingScore = +document.querySelector("#winingScore").value;
    winingScore === 0 ? (winingScore = 100) : winingScore;
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gameState = true;
    reset();
    document.querySelector("#playerScore-0").textContent = 0;
    document.querySelector("#playerScore-1").textContent = 0;
    document.querySelector("#playerName-0").textContent = "PLAYER 1";
    document.querySelector("#playerName-1").textContent = "PLAYER 2";
    document.querySelector(`.player-0`).classList.add("acitvePlayer");
    document.querySelector(`.player-1`).classList.remove("acitvePlayer");
  }

  function onRollDice() {
    if (gameState) {
      var firstDice = Math.floor(Math.random() * 6) + 1;
      var secounDice = Math.floor(Math.random() * 6) + 1;
      var firstDiceImg = document.querySelector("#diceImg-1");
      var secounDiceImg = document.querySelector("#diceImg-2");
      firstDiceImg.src = `./dice/dice-${firstDice}.png`;
      secounDiceImg.src = `./dice/dice-${secounDice}.png`;
      if (firstDice === 6 && secounDice === 6) {
        score[activePlayer] = 0;
        updateScore();
      } else if (firstDice === 1 || secounDice === 1) {
        nextPlayer();
      } else {
        currentScore += firstDice + secounDice;
        document.querySelector(
          `#currentScore-${activePlayer}`
        ).textContent = currentScore;
      }
    }
  }

  function onHold() {
    if (gameState) {
      score[activePlayer] += currentScore;
      updateScore();
      if (score[activePlayer] >= winingScore) {
        gameState = false;
        document.querySelector(`#playerName-${activePlayer}`).innerHTML =
          "<h1>WINNER!</h1>";
      } else {
        nextPlayer();
      }
    }
  }

  function nextPlayer() {
    currentScore = 0;
    reset();
    document.querySelector(".player-0").classList.toggle("acitvePlayer");
    document.querySelector(".player-1").classList.toggle("acitvePlayer");
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  }

  function updateScore() {
    document.querySelector(`#playerScore-${activePlayer}`).textContent =
      score[activePlayer];
  }

  function reset() {
    document.querySelector("#currentScore-0").textContent = 0;
    document.querySelector("#currentScore-1").textContent = 0;
    document.querySelector("#diceImg-1").src = "";
    document.querySelector("#diceImg-2").src = "";
  }
})();
