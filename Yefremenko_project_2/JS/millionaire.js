//Питання
const questions = [
  'Що з цього не є косметичним засобом?',
  'Хто з`їв колобка?',
  'Якої шахової фігури не існує?',
  'Про яку сім`ю йдеться у романі "Жовтий князь"?',
  'У склад будьякої оргаічної речовини входить?',
  'Як називається зірка, яка вказала волхвам на місце народження Христа?',
  'Де любопитній Варварі ніс відірвали?',
  'Хто створив Ейфелеву Башту?',
  'Який танок виконав Чарлі Чаплин у фільмі «Золота лихоманка»?',
  'Які сім’ї на думку Л.М Толстого схожі?',
  'Яке астрономічне явище можна спостерігати один раз у 76 років?',
  'У яку одежу прийнято плакати, щоб викликати співчування?',
  'Що взимку роблять молоді олені?',
  'Які з цих прикрас можна зустріти на новорічній ялинці?',
  'Який колір виходить при змішуванні синього і червоного?',
];
const answers = [1, 2, 3, 4];
//Поле для питань
let questionsField = document.querySelector('.questions_field');

//Отриуємо чекбокси
const answerFields = [
  document.querySelector('#answer1'),
  document.querySelector('#answer2'),
  document.querySelector('#answer3'),
  document.querySelector('#answer4'),
];

//Кнопки
let btn = document.querySelector('#btn_ans');
let btn2 = document.querySelector('#fifty-fifty');
let btn3 = document.querySelector('#call_friend');
let btnStartStop = document.querySelector('#btn_start');

//level 
let level1 = document.querySelector('.level_active');






//Початок гри.
questionsField.append(question1);


btn.addEventListener('click', (event) => {
  console.log('Log:', event);

});


btn2.addEventListener('click', (event) => {
  console.log('50/50');
});

btn3.addEventListener('click', (event) => {
  const random = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0) + 1)) + Math.ceil(0);
  questionsField.textContent = questions[random];
});

//Таймер

let timerShow = document.querySelector('.timer');
let seconds = 60; //Початкове значення

btnStartStop.addEventListener('click', function () {
  timer = setInterval(function () {
    // Условие если время закончилось то...
    if (seconds <= 0) {
      // Таймер удаляется
      clearInterval(timer);
      // Выводит 0
      timerShow.innerHTML = 0;
    } else {
      // Создаём строку с выводом времени
      let strTimer = `${seconds}`;
      // Выводим строку в блок для показа таймера
      timerShow.innerHTML = strTimer;
    }
    if (seconds < 6) {
      timerShow.style.background = "#ff000096";
    }

    --seconds; // Уменьшаем таймер
  }, 1000)


  level1.style.cssText = 'color: gold; filter: brightness(150%);';

})

//кінецт гри
function gameOver () {
  questionsField.textContent = 'GAME OVER';
  questionsField.style.cssText = 'color: red; font-size: 35px; font-weight: 700; padding-top: 28px; background = "#ff000096";';
}