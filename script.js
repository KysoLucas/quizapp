// Question Bank

var questions = [
  {
    questionNum: 1,
    questionType: "mc",
    question: "1 + 1 = ?",
    choices: ["2", "3", "4", "5", "6", "7", "8", "9"],
    answer: "2",
  },
  {
    questionNum: 2,
    questionType: "mc",
    question: "1 + 2 = ?",
    choices: ["2", "3", "4", "5", "6", "7"],
    answer: "3",
  },
  {
    questionNum: 3,
    questionType: "mc",
    question: "1 + 3 = ?",
    choices: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    questionNum: 4,
    questionType: "input",
    question: "How old is Lionel Messi?",
    answer: "35",
  },
];

const questionNum = document.getElementById("questionNum");
const question = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
let score = 0;
let currentQuestionNum = 0;

function startQuiz() {
  document.querySelector("#startQuizBox").classList.add("d-none");
  for (let counter = 0; counter < questions.length; counter++) {
    // adding "if" for skipping input question
    if (questions[counter].questionType == "mc") {
      shuffle(questions[counter].choices);
    }
  }
  showQuestion();
}

//function for shuffling sequences of choices of each question

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showQuestion() {
  if (currentQuestionNum < questions.length) {
    document.querySelector("#quizContent").classList.remove("d-none");
    questionNum.innerHTML =
      "Question " + questions[currentQuestionNum].questionNum;
    question.innerHTML = questions[currentQuestionNum].question;
    // if questionType is mc
    if (questions[currentQuestionNum].questionType == "mc") {
      questions[currentQuestionNum].choices.forEach((userChoices) => {
        const answerCol = document.createElement("div");
        answerCol.classList.add("col-12", "col-lg-6", "d-grid", "my-2");
        const button = document.createElement("button");
        button.value = userChoices;
        button.innerText = userChoices;
        button.classList.add("btn", "btn-outline-primary");
        button.addEventListener("click", () => checkAnswer(button.value));
        answerCol.appendChild(button);
        answerBox.appendChild(answerCol);
      });
    }
    // if questionType is input
    if (questions[currentQuestionNum].questionType == "input") {
      const inputAnswerBox = document.createElement("div");
      inputAnswerBox.classList.add("input-group", "mb-3");
      answerBox.appendChild(inputAnswerBox);
      const inputAnswerEnterBox = document.createElement("input");
      inputAnswerEnterBox.type = "text";
      inputAnswerEnterBox.value = "";
      inputAnswerEnterBox.classList.add("form-control");
      inputAnswerEnterBox.placeholder = "Answer";
      // Allow Pressing 'Enter' Key to Submit
      inputAnswerEnterBox.addEventListener("keypress", function (press) {
        if (press.key === "Enter") {
          checkAnswer(inputAnswerEnterBox.value);
        }
      });
      inputAnswerBox.appendChild(inputAnswerEnterBox);
      const inputAnswerSubmitBtn = document.createElement("button");
      inputAnswerSubmitBtn.classList.add("btn", "btn-outline-primary");
      inputAnswerSubmitBtn.type = "button";
      inputAnswerSubmitBtn.innerText = "Submit";
      inputAnswerSubmitBtn.addEventListener("click", () =>
        checkAnswer(inputAnswerEnterBox.value)
      );
      inputAnswerBox.appendChild(inputAnswerSubmitBtn);
    }
  }
}

function checkAnswer(x) {
  if (currentQuestionNum + 1 < questions.length) {
    document.querySelector("#nextQuestionBtn").classList.remove("d-none");
  } else {
    document.querySelector("#showResultBtn").classList.remove("d-none");
  }
  if (x.toLowerCase() == questions[currentQuestionNum].answer) {
    question.innerHTML = "Correct!";
    score++;
  } else {
    question.innerHTML = "Incorrect :(";
  }
  answerBox.innerHTML = ""; // reset
}

function nextQuestion() {
  currentQuestionNum++;
  document.querySelector("#nextQuestionBtn").classList.add("d-none");
  showQuestion();
}

function showResult() {
  document.querySelector("#quizContent").classList.add("d-none");
  document.querySelector("#showResultBtn").classList.remove("d-none");
  document.querySelector("#result").classList.remove("d-none");
  document.querySelector("#userScore").innerText =
    "Your score is " + score + "/" + questions.length + ".";
}

function tryAgain() {
  window.location.reload();
}
