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
    next: null,
    question: "Which animal can stand on its tail?",
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
console.log(answerElement);
var currentAnswers = document.getElementById("answers-container");
questionElement.innerText = currentQuestion.question;
answerElement.innerText = currentQuestion.answers;
var i = 0;

// hide questions.
function hideQuestion() {
  questionElement.style.display = "none";
  currentAnswers.style.display = "none";
}
hideQuestion();

// When the start button is clicked, a timer begins and a question appears.
var begin = beginQuiz.addEventListener("click", function (event) {
  event.preventDefault();
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
  }
}
showQuestion(currentQuestion);

function handleAnswerClick(event) {
  event.preventDefault();
  console.log(event.target.dataset.choice);

  // When an answer choice is clicked, it turns green for correct and red for incorrect.
  if (event.target.dataset.choice === correctChoice) {
    console.log("correct");
    console.log(currentQuestion);
  } else {
    console.log("wrong");
  }
  newQuestion();
}

// The next question and answer choices are shown.
function newQuestion() {
  var nextQuestion = triviaQuestions.filter(
    (questionItem) => currentQuestion.next === questionItem.id
  );
  currentQuestion = nextQuestion[0];

  showQuestion(currentQuestion);
}

// If it is incorrect, time from the timer is subtracted.

// When all the questions are answered or the timer reaches 0, user is given a score based off the time they have left.

// User is asked for initials and their score is stored in local storage.
