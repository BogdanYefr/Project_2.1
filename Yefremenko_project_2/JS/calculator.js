let a = ''; //перше число
let b = ''; //друге число
let sign = ''; //знак операції
let finish = false;

const digit = ['0','1','2','3','4','5','6','7','8','9','.']; // для перевірки того, що натиснуто
const action = ['-','+','X','/','%']; //для перевірки натиснутої операції

//екран
const screen = document.querySelector('.calc-screen p');

//функція очистки екрану
function clearAll () {
  a = '';
  b = '';
  sign = '';
  finish = false;
  screen.textContent = 0;
}

//активуємо кнопку очсистки екрану
document.querySelector('.ac').onclick = clearAll;

//перевіряємо куди натиснуто (на кнопку чи ні)
document.querySelector('.buttons').onclick = (event) => {
  //натиснута не кнопка
  //if(!event.target.classlist.contains('btn')) return;
  //натиснута clearAll, для цього івенту вже є фукція
  //if(event.target.classlist.contains('ac')) return;
  //якщо натиснута інша кнопка чистимо екран 
  screen.textContent = '0';
  //одержуємо натиснуту кнопку
  const key = event.target.textContent;
  //перевіряємо чи нажата цифра чи точка
  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key;
      
      screen.textContent = a;
    } else if (a != '' && b != '' && finish) {
      b = key;
      finish = false;
      screen.textContent = b;
    } else {
      b += key;
      screen.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }

  //перевіряємо чи нажатий оператор
  if (action.includes(key)) {
    sign = key;
    screen.textContent = sign;
    console.log(a, b, sign);
    return;
  }

  //якщо натиснуто =
  if (key === '=') {
    if (b === '') b = a;
    switch (sign) {
        case '+':
          a = (+a) + (+b);
          break;
        case '-':
          a = a - b;
          break;
        case 'X':
          a = a * b;
          break;
         case '/':
          a = a / b;
          break;
         case '%':
          a = a - b * (a / 100);
          break;
    }
    
    finish = true;
    screen.textContent = a;
    console.log(a, b, sign);
  }

}