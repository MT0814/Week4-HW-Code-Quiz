function getHighScores() {
  //   var highScores = localStorage.getItem("highscores");
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  var scoresEl = document.querySelector("#ini-name1");
  scoresEl.textContent = highScores[0];
}
getHighScores();
