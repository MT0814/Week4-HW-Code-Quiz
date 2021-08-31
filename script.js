var questions = [
  {
    numb: 1,
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      "msg('Hello World')",
      "msgBox('Hello World');",
      "alertBox('Hello World');",
      "alert('Hello World');",
    ],
    correct: 3,
  },
  {
    numb: 2,
    question: "How to empty an array in JavaScript?",
    answers: [
      "arrayList[]",
      "arrayList(0)",
      "arrayList.length=0",
      "arrayList.len(0)",
    ],
    correct: 2,
  },
  {
    numb: 3,
    question:
      "What function to add an element at the begining of an array and one at the end?",
    answers: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correct: 1,
  },
  {
    numb: 4,
    question: "What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    answers: ["undefined", "0", "prints nothing", "Syntax error"],
    correct: 0,
  },
  {
    numb: 5,
    question: "What would following code return? console.log(typeof typeof 1);",
    answers: ["string", "number", "Syntax error", "undefined"],
    correct: 0,
  },
  {
    numb: 6,
    question: "Which software company developed JavaScript?",
    answers: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correct: 1,
  },
  {
    numb: 7,
    question: "What would be the result of 3+2+'7'?",
    answers: ["327", "12", "14", "57"],
    correct: 3,
  },
  {
    numb: 8,
    question: "Look at the following selector: $('div'). What does it select?",
    answers: [
      "The first div element",
      "The last div element",
      "All div elements",
      "Current div element",
    ],
    correct: 2,
  },
  {
    numb: 9,
    question: "How can a value be appended to an array?",
    answers: [
      "arr(length).value;",
      "arr[arr.length]=value;",
      "arr[]=add(value);",
      "None of these",
    ],
    correct: 1,
  },
  {
    numb: 10,
    question:
      "What will the code below output to the console? console.log(1 +  +'2' + '2');",
    answers: ["'32'", "'122'", "'13'", "'14'"],
    correct: 0,
  },
];

var score = 0;
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var infoBox = document.getElementById("info_box");
var timerEl = document.getElementById("countdown");
var restartButton = document.getElementById("restart-btn");
var resultsContainerEl = document.getElementById("results-container");
let shuffledQuestions, currentQuestionIndex;
var timeInterval;
var timeLeft = 50;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function countdown() {
  if (timeLeft == 0) {
    return false;
  }

  
  timeInterval = setInterval(function () {

    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + "s left";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + "s left";
      timeLeft--;
    } else {
      timerEl.textContent = "";
      clearInterval(timeInterval);
      stopGame();
      resultsContainerEl.classList.remove("hide");
    }
  }, 1000);
}

function startGame() {
  countdown();
  startButton.classList.add("hide");
  infoBox.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  if (currentQuestionIndex === 10) {
    stopGame();
    return;
  }
  questionEl.innerText = question.question;
  for (var i = 0; i < question.answers.length; i++) {
    var answer1 = document.getElementById("ans" + (i + 1));
    answer1.innerText = question.answers[i];
    answer1.selected = i;
    answer1.question = question;
    // console.log("before;", i, answer1.classList);
    answer1.classList = "btn";
    answer1.disabled = false;
    // console.log("after;", i, answer1.classList);
    answer1.addEventListener("click", selectAnswer);
  }
  console.log("correct: ", question.correct);
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsEl.firstchild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

function selectAnswer(e) {
  var selectedButton = e.target;

  setStatusClass(
    selectedButton,
    selectedButton.selected === selectedButton.question.correct
  );

  for (var i = 0; i < selectedButton.question.answers.length; i++) {
    var answer1 = document.getElementById("ans" + (i + 1));
    answer1.disabled = true;
  }

  if (shuffledQuestions.length >= currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    stopGame();
  }
}

function stopGame() {
  questionContainerEl.classList.add("hide");
  clearInterval(timeInterval);
  resultsContainerEl.classList.remove("hide");
  var scoreEl = document.querySelector(".score");
  scoreEl.textContent = timeLeft;
}

function setStatusClass(element, correct) {
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function saveHighScores(event) {
  event.preventDefault();
  var initials = document.querySelector("#name").value;
  var score = initials + " "+" "+" " + timeLeft;
  console.log(score);

  // var highScores = localStorage.getItem("highscores") || [];
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  highScores.push(score);
  //sort
  // localStorage.setItem("highscores", score);
  localStorage.setItem("highscores", JSON.stringify(highScores));

  document.location.href = "./highscores.html";
}

var submit = document.querySelector("#submit-score");
submit.addEventListener("submit", saveHighScores);
