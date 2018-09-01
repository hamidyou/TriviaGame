$(document).ready(function () {
  /*Global Variables & Functions*/
  const displayText = (element, str) => $(element).text(str);
  const setAttr = (element, attr, value) => $(element).attr(attr, value);
  let correct = 0;
  let incorrect = 0;

  const percentage = function () {
    if (questionNumber !== 1) {
      return (correct / (correct + incorrect)).toLocaleString('en-US', { style: 'percent' })
    } else {
      return Number('0').toLocaleString('en-US', { style: 'percent' })
    }
  };

  const hide = x => $(x).hide();
  const show = x => $(x).show();

  hide('#showResults');
  hide('.main');
  hide('.next');

  /*Question & Answer Variables*/
  const questions = [
    {
      question: "What is the name of the story Bilbo wrote about his adventures?",
      choices: ["The Hobbit by Bilbo Baggins", "The Silmarillion by Bilbo Baggins", "A Hobbits Tale by Bilbo Baggins", "Into the West by Bilbo Baggins"],
      correct: "A Hobbits Tale by Bilbo Baggins",
      image: "assets/images/bilbo.jpg"
    },
    {
      question: "Which of the following animals glows a light green when a black light is shined on them?",
      choices: ["scorpion", "mouse", "bat", "lizard"],
      correct: "scorpion",
      image: "assets/images/scorpion.jpg"
    },
    {
      question: "How many cloud droplets - a cloud droplet is 100 times smaller than a raindrop - does it take to make a snowflake?",
      choices: ["100,000", "1,000", "100", "1,000,000"],
      correct: "100,000",
      image: "assets/images/snow.jpg"
    },
    {
      question: "Which of the following is NOT one of the lines used in palm reading?",
      choices: ["The Line of Heart", "The Line of Head", "The Line of Life", "The Line of Strength"],
      correct: "The Line of Strength",
      image: "assets/images/palmLines.jpg"
    },
    {
      question: "What is a pangram?",
      choices: ["A sentence that uses all 26 letters of the English alphabet", "A word that uses only contains the vowel 'y' (ex. SYZYGY)", "A word which has at least 2 definitions that contradict each other", "A sentence that begins and ends with the same word"],
      correct: "A sentence that uses all 26 letters of the English alphabet",
      image: "assets/images/pangram.jpg"
    },
    {
      question: "What is the world's longest snake?",
      choices: ["Reticulated Python", "Green Anaconda", "Boa Constrictor", "King Cobra"],
      correct: "Reticulated Python",
      image: "assets/images/python.jpg"
    },
    {
      question: "What is the hottest pepper based on Scoville Heat Units?",
      choices: ["Carolina Reaper", "Ghost Pepper", "Trinidad Moruga Scorpion", "Red Savina Habanero"],
      correct: "Carolina Reaper",
      image: "assets/images/carolinaReaper.jpg"
    },
    {
      question: "Which baby animal is born without it's iconic feature?",
      choices: ["baby camel - hump", "baby elephant - trunk", "baby hedgehog - quills", "baby dolphin - dorsal fin"],
      correct: "baby camel - hump",
      image: "assets/images/camel.jpg"
    },
    {
      question: "What famous bear was originally named 'Edward Bear'",
      choices: ["Baloo", "Winnie the Pooh", "Smokey Bear", "Paddington Bear"],
      correct: "Winnie the Pooh",
      image: "assets/images/winnieThePooh.jpg"
    },
    {
      question: "Which organ was thrown out by ancient Egyptians when making a mummy?",
      choices: ["brain", "heart", "skin", "kidney"],
      correct: "brain",
      image: "assets/images/kingTut.jpg"
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
  let currentQuestion = '';
  let currentChoices = [];
  let currentCorrect = '';
  let currentImage = '';

  /*randomize question order and store in variable*/
  const questionOrder = shuffleArray(questionArray);

  const questionIndex = () => questionOrder[questionNumber - 1];

  /*Get question object*/
  const setQuestionVars = function (x) {
    currentQuestion = x.question;
    currentChoices = x.choices;
    currentCorrect = x.correct;
    currentImage = x.image;
    // console.log(currentQuestion);
    // console.log(currentChoices);
    // console.log(currentCorrect);
  }

  /*Display Question*/
  const displayQuestion = function (elm) {
    displayText(elm, currentQuestion);
  }

  /*Display Choices Shuffled*/
  const displayChoices = function () {
    shuffleArray(choicesArray).map(choicesMapFunction);
  };

  const choicesMapFunction = function (c, d) {
    displayText('#choice' + (d + 1), currentChoices[c])
  };

  const displayScores = function () {
    displayText('#numberCorrect', correct);
    displayText('#numberIncorrect', incorrect);
    displayText('#percentage', percentage());
  }

  /*Initialize & Set Variables*/
  const setVars = function () {
    show('.main');
    setQuestionVars(questions[questionIndex()]);
    displayText('.card-header', 'Question # ' + questionNumber)
    displayQuestion('.card-title');
    displayChoices();
    timer.reset();
    timer.start();
    switchButton();
    displayScores();
  }

  const reset = function () {
    correct = 0;
    incorrect = 0;
    questionNumber = 1;
    shuffleArray(questionArray);
    setVars();
  }

  /*change START button to RESET*/
  const switchButton = function () {
    if (questionNumber <= 10) {
      setAttr('#start', 'id', 'reset');
      displayText('#reset', 'RESET');
    } else {
      setAttr('#reset', 'id', 'start');
      displayText('#start', 'PLAY AGAIN');
    }

  }

  /*After answer Logic*/
  const showAnswerImage = function () {
    hide('#choiceList, .card-header, .card-title');
    show('#showResults');
    setAttr('#answerImage', 'src', currentImage);
  }

  const nextQuestion = function () {
    show('#choiceList, .card-header, .card-title, #timer');
    hide('#showResults, .next');
    setVars();
  }

  const gameOver = function () {
    if (questionNumber === 11) {
      displayText('#result', 'GAME OVER');
      hide('#timer');

    } else {
      hide('#timer');
      show('.next');
    }
  }

  /*Check Answer*/
  const checkAnswer = (x) => x === currentCorrect;
  const displayResult = function (x) {
    if (x) {
      displayText('#result', 'CORRECT!');
      correct++;
      console.log(correct);
    } else if (timer.time === 0) {
      displayText('#result', "TIME'S UP!");
      incorrect++;
    } else {
      displayText('#result', 'INCORRECT!');
      incorrect++;
    }
    displayText('#showCorrectAnswer', currentCorrect)
    showAnswerImage();
    displayScores();
    questionNumber++;
    setTimeout(gameOver, 2000);
  }

  $(document).on('click', '#choice1, #choice2, #choice3, #choice4', function () {
    let selectedAnswer = $(this).text();
    displayResult(checkAnswer(selectedAnswer));
    timer.reset();
  });

  /*Timer*/
  let intervalId;
  let clockRunning = false;
  let currentTime = '';

  const timer = {
    time: 30,
    reset: function () {
      timer.time = 30;
      displayText('#timer', '00:30')
      timer.stop();
    },
    start: function () {
      if (!clockRunning) {
        intervalId = setInterval(timer.count, 1000)
      }
      clockRunning = true;
    },
    stop: function () {
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function () {
      timer.time--;
      currentTime = timer.timeConverter(timer.time);
      displayText('#timer', currentTime);
      if (timer.time === 0) {
        timer.reset();
        displayResult(false);
      }
    },
    timeConverter: function (t) {
      let minutes = Math.floor(t / 60);
      let seconds = t - (minutes * 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes === 0) {
        minutes = "00";
      } else if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return minutes + ":" + seconds;
    }
  };

  /*Start the Game*/
  $(document).on('click', '#start', setVars);
  $(document).on('click', '#reset', reset);
  $(document).on('click', '.next', nextQuestion);

});