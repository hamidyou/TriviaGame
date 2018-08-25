$(document).ready(function () {
  /*Global Variables & Functions*/
  const displayText = (element, text) => $(element).text(text);

  /*Question & Answer Variables*/
  const questions = [
    {
      question: "Question 1",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 2",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 3",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 4",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 5",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 6",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 7",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 8",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 9",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    },
    {
      question: "Question 10",
      choices: ["Answer Option A", "Answer Option B", "Answer Option C", "Answer Option D"],
      correct: "Answer Option A"
    }
  ]

  const shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const questionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const choicesArray = [0, 1, 2, 3];
  let questionNumber = 1;

  /*Question & Answer Logic & Display*/

  /*randomize question order and store in variable*/
  const questionOrder = shuffleArray(questionArray);

  const questionIndex = questionOrder[questionNumber - 1];

  /*Get question object*/
  const currentQuestion = function () {
    return questions[questionIndex];
  }

  /*Display Question*/
  const displayQuestion = function (elm) {
    displayText(elm, currentQuestion().question);
    console.log('displayQuestion');
  }

  /*Display Choices Shuffled*/
  const displayChoices = function () {
    shuffleArray(choicesArray).map(choicesMapFunction);
  };

  const choicesMapFunction = function (c, d) {
    displayText('#choice' + (d + 1), currentQuestion().choices[c])
  }

  $(document).on('click', '#start', function () {
    displayText('.card-header', 'Question # ' + questionNumber)
    displayQuestion('.card-title');
    displayChoices();
    console.log('working');
  });
});