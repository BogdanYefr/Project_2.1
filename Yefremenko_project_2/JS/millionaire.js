//Питання
const questions = [
  "Що з цього не є косметичним засобом? А) Помада, B) Тату, C) Крем, D) Пудра",
  "Хто з`їв колобка? A) Дід, B) Бабка, C) Заяць, D) Лисиця",
  "Якої шахової фігури не існує? A) Пішка, B) Кінь, C) Дама, D) Король",
  'Про яку сім`ю йдеться у романі "Жовтий князь"? A) Катранників, B) Голощапових, C) Анциборів, D) Тищенків',
  "У склад будьякої оргаічної речовини входить? A) Кисень, B) Вуглець, C) Водень, D) Азот",
  "Як називається зірка, яка вказала волхвам на місце народження Христа? A) Віфлеємська, B) Фіфіємська, C) Коцюбинська, D) Нідерландська",
  "Де любопитній Варварі ніс відірвали? A) у гаражі, B) на базарі, C) у полі, D) на дискотеці",
  "Хто створив Ейфелеву Башту? A) Рузвельт, B) Сталін, C) Тесла D) Ейфель",
  "Який танок виконав Чарлі Чаплин у фільмі «Золота лихоманка»? A) танок булочек, B) танок бургерів, C) танок відбивних D) танок щенят",
  "Які сім’ї на думку Л.М Толстого схожі? A) Грустні, B) Щасливі, C) Радісні D) Веселі",
  "Яке астрономічне явище можна спостерігати один раз у 76 років? A) Лунне затемнення, B) Захід сонця, C) Комета Галлея, D) Взрив марсу",
  "У яку одежу прийнято плакати, щоб викликати співчування? A) Спіднє, B) Штани, C) Куртку, D) Жилетку",
  "Що взимку роблять молоді олені? A) Відкидають копита, B) Ловлять кроликів, C) Скидають роги, D) Ловлять мисливців",
  "Які з цих прикрас можна зустріти на новорічній ялинці? A) Буси, B) Сережки, C) Коль'є D) Браслети",
  "Який колір виходить при змішуванні синього і червоного? A) Чорний, B) Зелений, C) Жовтий D) Фіолетовий",
  "заглушка",
];
const keys = [1, 3, 2, 0, 1, 0, 1, 3, 0, 1, 2, 3, 2, 0, 3];
const levelFields = [];

const inputBlock = document.querySelector(".input_block");

//Поле для питань
const questionsField = document.querySelector(".questions_field");

//Кнопки
const btnAnswer = document.querySelector("#btn_ans");
const btnFiftyFifty = document.querySelector("#fifty-fifty");
const btnCallFriend = document.querySelector("#call_friend");
const btnStart = document.querySelector("#btn_start");
const radioButtons = document.getElementsByName("answer"); //винесемо змінну на верх для глобальної видимості

let level = 0;
let timer; //винесемо змінну на верх для глобальної видимості
let seconds = 59; //Початкове значення таймера
let call_help;
let trueAns; //отримали правильну відповідь для 50/50
let falseAns; //отримали неправильну відповідь для 50/50

//Таймер
const timerShow = document.querySelector(".timer");

//Отриуємо радіобаттони
for (let i = 1; i <= 15; i++) {
  levelFields.push(document.querySelector(".level_" + i));
}

//Початок гри.
function changeLevel(l) {
  questionsField.textContent = questions[l];
  levelFields[l].style.filter = "brightness(150%)";
  levelFields[l].style.color = "gold";
}

radioButtons.forEach((elem) => {
  elem.addEventListener("change", () => {
    disableAnswerButton(false);
  });
});

btnAnswer.addEventListener("click", () => {
  // get answer
  let answer;
  radioButtons.forEach((checkbox, i) => {
    if (checkbox.checked) {
      answer = i;
    }
    checkbox.checked = false;
    checkbox.classList.remove("opacity_zero");
  });
  // check answer
  if (answer === keys[level]) {
    if (level === 14) {
      winner();
    } else {
      level++;
      changeLevel(level);
      showTimer();
    }
    timerShow.classList.remove("danger");
    clearInterval(timer);
    seconds = 60;
    disableAnswerButton(true);
  } else {
    clearInterval(timer);
    gameOver();
  }
  if (call_help) {
    call_help.style.opacity = "1";
  }
});

//50\50
btnFiftyFifty.addEventListener("click", () => {
  let falseAnswers = []; //отримали масив з неправильними
  for (let i = 0; i <= 3; i++) {
    if (keys[level] === i) {
      trueAns = radioButtons[i];
    }
    if (keys[level] != i) {
      falseAnswers.push(radioButtons[i]);
    }
    radioButtons[i].classList.add("opacity_zero"); //навісимо опаситі на всі елементи масиму
  }
  falseAns = falseAnswers[0].classList.remove("opacity_zero"); // перша неправильна 3 трьох неправильних з відміною опаситі
  trueAns.classList.remove("opacity_zero");
  btnFiftyFifty.setAttribute("disabled", "disabled");
  btnFiftyFifty.style.opacity = "0.7";
});

//дзвінок другу

btnCallFriend.addEventListener("click", () => {
  const random =
    Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0) + 1)) +
    Math.ceil(0);
  call_help = radioButtons[random];
  call_help.checked = true;
  call_help = radioButtons[random];
  call_help.style.opacity = "0.4";
  btnCallFriend.setAttribute("disabled", "disabled");
  btnCallFriend.style.opacity = "0.7";
  disableAnswerButton(false);
});

const showTimer = () => {
  timer = setInterval(function () {
    // Условие если время закончилось то...
    timerShow.innerHTML = `${seconds}`;
    if (seconds === 0) {
      gameOver();
      clearInterval(timer);
      seconds = 59;
    }
    if (seconds < 6) {
      timerShow.classList.add("danger");
    }

    --seconds; // Уменьшаем таймер
  }, 1000);
};

btnStart.addEventListener("click", function () {
  disableAnswerButton(true);
  showTimer();
  changeLevel(level);
  btnStart.classList.add("d-none");
  inputBlock.classList.replace("d-none", "d-flex");
  btnAnswer.style.display = "block";
});

//кінецт гри
let prize = document.querySelector(".prize");

function gameOver() {
  questionsField.textContent = "GAME OVER";
  questionsField.style.cssText =
    'color: red; font-size: 35px; font-weight: 700; padding-top: 28px; background = "#ff000096";';
  questionsField.style.background = "#ff000070";
  levelFields[level].style.color = "red";
  inputBlock.classList.replace("d-flex", "d-none");
  btnAnswer.style.display = "none";
  prize.style.display = "block";
  whatPrize();
}

//счетчик призу

function whatPrize() {
  if (level > 4 && level < 11) {
    prize.textContent = "Ви здобули 1000грн!";
  }
  if (level > 9 && level < 16) {
    prize.textContent = "Ви здобули 32000грн!";
  }
}

function winner() {
  inputBlock.style.display = "none";
  btnAnswer.style.display = "none";
  prize.style.display = "block";
  prize.textContent = "Вітаю!!! Ви здобули 1000000грн!";
  prize.style.fontSize = "40px";
  questionsField.style.display = "none";
  clearInterval(timer);
  seconds = 60;
}

function disableAnswerButton(isDisabled) {
  btnAnswer.disabled = isDisabled;
  btnAnswer.style.opacity = isDisabled ? "0.7" : "1";
}
