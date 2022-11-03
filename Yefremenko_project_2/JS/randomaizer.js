
const minVal = document.querySelector('#minVal');
const maxVal = document.querySelector("#maxVal");
const amount = document.querySelector("#amount");
const randomList = document.querySelector("#randomList");
const btn = document.querySelector("#btn");
const btn1 = document.querySelector("#btn1");

 
//Генерує цілі числа у заданому діапазоні (min, max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
// Повертає рядок (результат)
function generateRandom(min, max, amount) {
  let res = "";
  for (let i = 0; i < amount; i++) {
    res += getRandomInt(min, max) + ", ";
  }
  res = res.trim(); // видалити зайві пробіли
  // видалити останню зап'яту у списку
  return res.substring(0, res.length - 1);
}
 
function addRandomList() {
  // Введені значення у форму
  const min = minVal.value;
  const max = maxVal.value;
  const am = amount.value;
 
  // Перевірка на наявність значень
  if (!min || !max || !am) {
    let liElem = document.createElement("li");
    liElem.className = "list_block_item";
    liElem.style = "font-size: 14px; color: red; padding: 7px 15px;";
    liElem.textContent = "No data entered";
    randomList.appendChild(liElem);
    return;
  }


  // Додати результат на сторінку
  let strResult = generateRandom(min, max, am);
  let liElem = document.createElement("li");
  liElem.className = "list_block_item";
  liElem.style = "font-size: 14px; padding: 7px 15px;";
  liElem.textContent = strResult;
  randomList.appendChild(liElem);
}

//Видалити результат та почистити инпути
function clear() { 
  randomList.innerHTML = '';
  minVal.value = '';
  maxVal.value = '';
  amount.value = '';
}


// обробник кліку на кнопку
btn.addEventListener("click", addRandomList);
btn1.addEventListener("click", clear);