
function getHighScores() {
  //   var highScores = localStorage.getItem("highscores");
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  var nameEl = document.querySelector("#ini-name1");
  // nameEl.textContent = highScores[0];


  for (var i = 0; i < highScores.length; i++) {
    var iniName = document.getElementById("ini-name"+(i+1));
    iniName.classList.remove('hide')
    iniName.textContent = 'Name: ' + highScores[i] + ' points';

  }
  
    

  }


getHighScores();

   
