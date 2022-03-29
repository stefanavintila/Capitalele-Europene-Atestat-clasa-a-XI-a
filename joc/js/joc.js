const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Care este capitala Austriei?",
    choice1: "Londra",
    choice2: "Paris",
    choice3: "Viena",
    answer: 3
  },
  {
    question:
      "Care este capitala Belgiei?",
    choice1: "Oslo",
    choice2: "Bruxel",
    choice3: "Atena",
    answer: 2
  },
  {
    question: "Care este capitala Bulgariei?",
    choice1: "Sofia",
    choice2: "Ankara",
    choice3: "Belgrad",
    answer: 1
  },
  {
	question: "Care este capitala Cehiei?",
    choice1: "Bratislava",
    choice2: "Praga",
    choice3: "Skopje",
    answer: 2
  },
  {
    question: "Care este capitala insulei Cipru?",
    choice1: "Atena",
    choice2: "Ankara",
    choice3: "Nicosia",
    answer: 3
  },
  {
    question: "Care este capitala Croației?",
    choice1: "Sofia",
    choice2: "Zagreb",
    choice3: "Belgrad",
    answer: 2
  },
  {
    question: "Care este capitala Danemarcei?",
    choice1: "Helsinki",
    choice2: "Copenhaga",
    choice3: "Oslo",
    answer: 2
  },
  {
    question: "Care este capitala Estoniei?",
    choice1: "Talin",
    choice2: "Tirana",
    choice3: "Riga",
    answer: 1
  },
  {
    question: "Care este capitala Finlandei?",
    choice1: "Oslo",
    choice2: "Copenhaga",
    choice3: "Helsinki",
    answer: 3
  },
  {
    question: "Care este capitala Franței?",
    choice1: "Paris",
    choice2: "Reunion",
    choice3: "Lyon",
    answer: 1
  },
  {
    question: "Care este capitala Germaniei?",
    choice1: "Budapesta",
    choice2: "Berlin",
    choice3: "Belgrad",
    answer: 2
  },
  {
    question: "Care este capitala Greciei?",
    choice1: "Atena",
    choice2: "Zagreb",
    choice3: "Ankara",
    answer: 1
  },
   {
    question: "Care este capitala Irlanda?",
    choice1: "Kosovo",
    choice2: "Dublin",
    choice3: "Londra",
    answer: 2
  },
  {
    question: "Care este capitala Luxemburgului?",
    choice1: "Sofia",
    choice2: "Luxemburg",
    choice3: "Skopje",
    answer: 2
  },
  {
    question: "Care este capitala Italiei?",
    choice1: "Sardinia",
    choice2: "Vatican",
    choice3: "Roma",
    answer: 3
  },
  {
    question: "Care este capitala Letoniei?",
    choice1: "Oslo",
    choice2: "Atena",
    choice3: "Riga",
    answer: 3
  },
  {
    question: "Care este capitala Lituaniei?",
    choice1: "Ukmerge",
    choice2: "Vilnius",
    choice3: "Ljubljana",
    answer: 2
  },
  {
    question: "Care este capitala Maltei?",
    choice1: "Valetta",
    choice2: "Vilnius",
    choice3: "Viena",
    answer: 1
  },
  {
    question: "Care este capitala Olandei?",
    choice1: "Sofia",
    choice2: "Amsterdam",
    choice3: "Belgrad",
    answer: 2
  },
  {
    question: "Care este capitala Poloniei?",
    choice1: "Vaduz",
    choice2: "Valetta",
    choice3: "Varșovia",
    answer: 3
  },
  {
    question: "Care este capitala Portugaliei?",
    choice1: "Lisabona",
    choice2: "Ljubljana",
    choice3: "Londra",
    answer: 1
  },
  {
    question: "Care este capitala României?",
    choice1: "Sofia",
    choice2: "Budapesta",
    choice3: "București",
    answer: 3
  },
  {
    question: "Care este capitala Slovaciei?",
    choice1: "Bratislava",
    choice2: "Baku",
    choice3: "Belgrad",
    answer: 1
  },
  {
    question: "Care este capitala Sloveniei?",
    choice1: "Lisabona",
    choice2: "Ljubljana",
    choice3: "Maribor",
    answer: 2
  },
  {
    question: "Care este capitala Suediei?",
    choice1: "Copenhaga",
    choice2: "Helsinki",
    choice3: "Stockholm",
    answer: 3
  },
  {
    question: "Care este capitala Ungariei?",
    choice1: "Berlin",
    choice2: "Budapesta",
    choice3: "București",
    answer: 2
  },
  
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 26;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("sfarsit.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
