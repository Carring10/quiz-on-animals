var triviaQuestions = [
  {
    id: 1,
    next: 2,
    question:
      "About how much stronger is a dog's sense of smell compared to humans'?",
    answers: {
      a: "10x",
      b: "100x",
      c: "1,000x",
      d: "100,000x",
    },
    correctAnswer: "d",
  },
  {
    id: 2,
    next: 3,
    question: "What color is a giraffe's tongue?",
    answers: {
      a: "Purple",
      b: "Green",
      c: "Pink",
      d: "Orange",
    },
    correctAnswer: "a",
  },
  {
    id: 3,
    question: "Which animal can stand on its tail?",
    next: null,
    answers: {
      a: "Monkeys",
      b: "Cats",
      c: "Kangaroos",
      d: "Lemurs",
    },
    correctAnswer: "c",
  },
];

var beginQuiz = document.getElementById("beginQuiz");
var currentQuestion = triviaQuestions[0];
var correctChoice = currentQuestion.correctAnswer;
var questionElement = document.getElementById("question");
var answerElement = document.querySelectorAll("[data-choice]");
var currentAnswers = document.getElementById("answers-container");
var endQuiz = document.getElementById("endQuiz");
var initials = document.getElementById("inputElement").value;
var submitBtn = document.getElementById("submitBtn");
var sec = 30;
var timer;

questionElement.innerText = currentQuestion.question;
answerElement.innerText = currentQuestion.answers;

// hide questions.
function hideQuestion() {
  questionElement.style.display = "none";
  currentAnswers.style.display = "none";
}
hideQuestion();

function startTime() {
  timer = setInterval(function () {
    document.getElementById("timerDisplay").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
}

// When the start button is clicked, a timer begins and a question appears.
beginQuiz.addEventListener("click", function (event) {
  event.preventDefault();
  startTime();
  // a question and its answers appear, the start button disappears.
  if (
    questionElement.style.display === "none" &&
    currentAnswers.style.display === "none"
  ) {
    questionElement.style.display = "block";
    currentAnswers.style.display = "block";
    beginQuiz.style.display = "none";
  }
});

function showQuestion(question) {
  questionElement.innerText = question.question;
  // Each iteration of the loop gives the property in the answers object.
  for (var choice in question.answers) {
    var answerElement = document.getElementById(choice);
    answerElement.innerText = question.answers[choice];
    answerElement.addEventListener("click", handleAnswerClick);
    console.log(answerElement);
  }
}
showQuestion(currentQuestion);

function handleAnswerClick(event) {
  event.preventDefault();
  console.log(event.target.dataset.choice);

  // When an answer choice is clicked, it adds time if the answer is correct.
  if (event.target.dataset.choice === correctChoice) {
    console.log(currentQuestion);
    sec += 10;
    document.getElementById("timerDisplay").innerHTML = "00:" + sec;
  } else {
    // If it is incorrect, time from the timer is subtracted.
    sec -= 10;
    document.getElementById("timerDisplay").innerHTML = "00:" + sec;
  }

  if (currentQuestion.next) {
    newQuestion();
  } else {
    showEndScreen();
    hideQuestion();
  }
}

// The next question and answer choices are shown.
function newQuestion() {
  var nextQuestion = triviaQuestions.filter(
    (questionItem) => currentQuestion.next === questionItem.id
  );
  currentQuestion = nextQuestion[0];
  correctChoice = currentQuestion.correctAnswer;
  showQuestion(currentQuestion);
}

function hideEndScreen() {
  endQuiz.style.display = "none";
}
hideEndScreen();

// When all the questions are answered or the timer reaches 0, user is given a score based off the time they have left.
function showEndScreen() {
  endQuiz.style.display = "block";
  clearInterval(timer);
}

// User is asked for initials and their score is stored in local storage.
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var initialsValue = document.getElementById("inputElement").value;
  console.log(initialsValue);
  localStorage.setItem(
    "Initials",
    initialsValue.toUpperCase() + " - Score: " + sec
  );
});
