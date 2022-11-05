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
];
const keys = [
  1, 3, 2, 0, 1, 0, 1, 3, 0, 1, 2, 3, 2, 0, 3
];
//Поле для питань
let questionsField = document.querySelector(".questions_field");
//Отриуємо чекбокси
const levelFields = [
  document.querySelector(".level_1"),
  document.querySelector(".level_2"),
  document.querySelector(".level_3"),
  document.querySelector(".level_4"),
  document.querySelector(".level_5"),
  document.querySelector(".level_6"),
  document.querySelector(".level_7"),
  document.querySelector(".level_8"),
  document.querySelector(".level_9"),
  document.querySelector(".level_10"),
  document.querySelector(".level_11"),
  document.querySelector(".level_12"),
  document.querySelector(".level_13"),
  document.querySelector(".level_14"),
  document.querySelector(".level_15"),
];

//const levelFields = [];

//for (let i = 0; i <= 15; i++) {
//  levelFields.push(document.querySelector('.level_' + i));
//}


//Кнопки
let btn = document.querySelector("#btn_ans");
let btn2 = document.querySelector("#fifty-fifty");
let btn3 = document.querySelector("#call_friend");
let btnStartStop = document.querySelector("#btn_start");



let level = 0;
let timer; //винесемо змінну на верх для глобальної видимості
let seconds = 59; //Початкове значення таймера
let checkboxes = document.getElementsByName("answer"); //винесемо змінну на верх для глобальної видимості
let call_help;

//Початок гри.
function changeLevel(l) {
  questionsField.textContent = questions[l];
  levelFields[l].style.filter = "brightness(150%)";
  levelFields[l].style.color = "gold";
}


btn.addEventListener("click", () => {
  // get answer
  //checkboxes = document.getElementsByName("answer");
  let answer;
  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked) {
      answer = i;
    }
  });
  // check answer
  if (answer === keys[level]) {
    level++;
    changeLevel(level);
    clearInterval(timer);
    seconds = 60;
    showTimer();
  } else {
    gameOver();
  }

  call_help.style.opacity = '1';
});

btn2.addEventListener("click", () => {
  console.log("50/50");
});

//дзвінок другу



btn3.addEventListener("click", () => {
  const random =
    Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0) + 1)) +
    Math.ceil(0);
  call_help = checkboxes[random];
  call_help.style.opacity = '0.4';
  btn3.setAttribute('disabled', 'disabled');
  btn3.style.opacity = '0.7';
});

//Таймер

let timerShow = document.querySelector(".timer");




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
      timerShow.style.background = "#ff000096";
    }

    --seconds; // Уменьшаем таймер
  }, 1000);

  //level1.style.cssText = "color: gold; filter: brightness(150%);";
};

btnStartStop.addEventListener("click", function () {
  showTimer();
  changeLevel(level);
  btnStartStop.style.display = 'none';
  document.querySelector('.d-none').style.display = 'flex';
  btn.style.display = 'block'
}); 


//кінецт гри
let prize = document.querySelector('.prize');

function gameOver() {
  questionsField.textContent = "GAME OVER";
  questionsField.style.cssText =
    'color: red; font-size: 35px; font-weight: 700; padding-top: 28px; background = "#ff000096";';
  questionsField.style.background = '#ff000070';
  levelFields[level].style.color = 'red';
  document.querySelector('.input_block').style.display = 'none';
  btn.style.display = 'none';
  prize.style.display = 'block';
  whatPrize();
}

//счетчик

function whatPrize () {
  if (level > 4 && level < 11) {
    prize.textContent = 'Ви здобули 1000грн!';
  } 
  if (level > 9 && level < 16) {
    prize.textContent = 'Ви здобули 32000грн!';
  }
}

function winner () {
  document.querySelector('.input_block').style.display = 'none';
  btn.style.display = 'none';
  prize.style.display = 'block';
  prize.textContent = 'Вітаю!!! Ви здобули 1000000грн!';
  prize.style.fontSize = '40px';
  questionsField.style.display = 'none';
}
  


