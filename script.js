class Question {
  constructor(question) {
    //конструктор вопроса, сюда передаем сам вопрос
    this.question = question;
    this.answers = [];
  }

  addAnswer(answer, checkCorrect) {
    // метод, добавить ответ, добавляет ответ в массив с ответами, и значение, являеться ли этот ответ верным
    this.answers.push([answer, checkCorrect]);
  }
}

function IsOneCorrectAnswer(answers) {
  //функция, которая проверяет, сколько правильных ответов на вопрос
  //если только один правильный ответ вернет true, иначе false
  let counter = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i][1]) {
      counter++;
    }
  }
  if (counter > 1) {
    return false;
  } else {
    return true;
  }
}

function checkAnswer(answers, userAnswer) {
  for (let i = 0; i < answers.length; i++) {
    if (userAnswer == answers[i][0] && answers[i][1]) {
      return true;
    }
  }
  return false;
}

class Test {
  //класс test, для работы с вопросами
  questions = []; // массив со всеми вопросами

  addQuestion(question) {
    //метод добавить вопрос
    this.questions.push(question);
  }

  showQuestion(index) {
    //метод отобразить вопрос по индексу на экране
    let cards = document.querySelectorAll(".card"); //находим все карточки на экране
    if (IsOneCorrectAnswer(this.questions[index].answers)) {
      //если только один правильный вариант ответа
      cards[1].classList.remove("visiable"); //скрываем карточку для нескольких правильных вариантов ответа
      cards[0].classList.add("visiable"); //добавляем карточку с одним правильным вариантом ответа
      cards[0].querySelector(".question").innerHTML =
        this.questions[index].question; // загружаем на страницу вопрос
      let answers = cards[0].querySelectorAll(".answers .answer"); //находим все элементы answer внутри нужной карточки
      for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = this.questions[index].answers[i][0]; //загружаем в них варианты ответа
      }

      let answersCopy = this.questions[index].answers;
      let marker = true;
      answers.forEach(function (button) {
        button.addEventListener("click", function () {
          if (marker) {
            if (checkAnswer(answersCopy, this.textContent)) {
              this.classList.add("green");
              marker = false;
            } else {
              this.classList.add("red");
              marker = false;
            }
          } else {
            alert("Вы уже ответили на этот вопрос");
          }
        });
      });
    } else {
      //если несколько правильных вариантов ответа
      cards[0].classList.remove("visiable"); //скрываем карточку с одним правильным вариантом ответа
      cards[1].classList.add("visiable"); //добавляем карточку для нескольких правильных вариантов ответа
      cards[1].querySelector(".question").innerHTML =
        this.questions[index].question; // загружаем на страницу вопрос
      let answers = cards[1].querySelectorAll(".answers .answer"); //находим все элементы answer внутри нужной карточки
      for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = this.questions[index].answers[i][0]; //загружаем в них варианты ответа
      }
      let answersCopy = this.questions[index].answers;
      let marker = true;

      let selectedIndices = [];
      answers.forEach(function (button, index) {
        button.addEventListener("click", function () {
          if (marker) {
            if (selectedIndices.includes(index)) {
              selectedIndices = selectedIndices.filter(function (i) {
                return i !== index;
              });
            } else {
              selectedIndices.push(index);
            }
            this.classList.toggle("border");
          } else {
            alert("Вы уже ответили на этот вопрос");
          }
        });
      });

      let giveAnswer = cards[1].querySelector(".give-answer");
      giveAnswer.addEventListener("click", function () {
        if (marker) {
          let userAnswers = [];
          for (let i = 0; i < answersCopy.length; i++) {
            userAnswers.push([answersCopy[i][0], false]);
          }

          for (let j = 0; j < selectedIndices.length; j++) {
            userAnswers[selectedIndices[j]][1] = true;
          }

          for (let i = 0; i < answersCopy.length; i++) {
            if (answersCopy[i][1] === userAnswers[i][1]) {
              answers[i].classList.add("green");
            } else {
              answers[i].classList.add("red");
            }
          }
          marker = false;
        } else {
          alert("Вы уже ответили на этот вопрос");
        }
      });
    }
  }
}

let question1 = new Question("Столица Франции?");
question1.addAnswer("Париж", true);
question1.addAnswer("Москва", false);
question1.addAnswer("Минск", false);
question1.addAnswer("Лондон", false);

let question2 = new Question("Какие бывают углы?");
question2.addAnswer("Острый", true);
question2.addAnswer("Тупой", true);
question2.addAnswer("Глупый", false);
question2.addAnswer("Прямой", true);

let question3 = new Question("7 + 12 = ?");
question3.addAnswer("18", false);
question3.addAnswer("19", true);
question3.addAnswer("17", false);
question3.addAnswer("10", false);

let question4 = new Question("Зачем человеку пальцы?");
question4.addAnswer("Чтобы писать код", true);
question4.addAnswer("Играть в Subway Surfers", true);
question4.addAnswer("Чтобы засовывать в розетку", false);
question4.addAnswer("Пальцы не нужны", false);

let question5 = new Question("% алк в охоте крепкой?");
question5.addAnswer("5%", false);
question5.addAnswer("5.5%", false);
question5.addAnswer("6%", false);
question5.addAnswer("6.5%", true);

let test = new Test();
test.addQuestion(question1);
test.addQuestion(question2);
test.addQuestion(question3);
test.addQuestion(question4);
test.addQuestion(question5);
test.showQuestion(0);

let buttonsBack = document.querySelectorAll(".back");
let buttonsForward = document.querySelectorAll(".forward");
let counters = document.querySelectorAll(".counter");
let currentQuestion = 0;
counters.forEach(function (counter) {
  counter.textContent = `${currentQuestion + 1}/${test.questions.length}`;
});

buttonsBack.forEach(function (button) {
  button.addEventListener("click", function () {
    if (currentQuestion == 0) {
      currentQuestion = test.questions.length;
    }

    currentQuestion -= 1;
    counters.forEach(function (counter) {
      counter.textContent = `${currentQuestion + 1}/${test.questions.length}`;
    });
    test.showQuestion(currentQuestion);
  });
});

buttonsForward.forEach(function (button) {
  button.addEventListener("click", function () {
    if (currentQuestion == test.questions.length - 1) {
      currentQuestion = -1;
    }
    currentQuestion += 1;
    counters.forEach(function (counter) {
      counter.textContent = `${currentQuestion + 1}/${test.questions.length}`;
    });
    test.showQuestion(currentQuestion);
  });
});
