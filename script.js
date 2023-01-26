let maxM = 20;
let minM = 10;
let amount = Math.floor(Math.random() * (maxM - minM) + minM);
let mathesF = document.getElementById("match");
let info = document.getElementById("info");
let pullButton = document.getElementById("pullCard");
let choosen = [];
let ready = false;
let isGame = true;

function generateMatches(amount, mathesF) {
  mathesF.innerHTML = "";
  for (let i = 0; i < amount; i++) {
    mathesF.innerHTML += `<img
    src="./images/match-simple.png"
    class="math-st"
    id="rc_${i}"
    alt=""
  />`;
  }
}
console.log(amount);
generateMatches(amount, mathesF);
addEventCardList();
pullButton.addEventListener("click", pull);
function pull() {
  ready = true;
}
function removeCard(n) {
  amount -= n;
  //mathesF.innerHTML = generateMatches(amount, mathesF);
  addEventCardList();
}

function addEventCardList() {
  let math_elements = document.getElementsByClassName("math-st");

  for (let i = 0; i < math_elements.length; i++) {
    math_elements[i].addEventListener("click", myMove);
  }
}

function play(event) {
  if (!isGame) return;
  let el = event.target;
  //   let elId = el.id;
  try {
    if (myMove(event)) return;
    setTimeout(computerMove, 2000);
  } catch (ex) {
    info.innerHTML = ex.message;
  }
}
function myMove(e) {
  let b = false;
  let elId = e.target.id;
  let mat = elId.substr(3);
  if (!choosen.includes(mat) && choosen.length <= 2) {
    choosen.push(mat);
    e.target.src = "./images/match-fire.png";
  }
  console.log(choosen);
  if (ready) {
    if (checkWin("You ")) {
      b = true;
    } else {
      setTimeout(removeCard.bind(choosen.length), 1000);
      console.log(amount);
    }
  }
  return b;
}

// function computerMove() {
//   isGame = false;
//   let b = false;
//   number = Math.floor(Math.random() * cards.length);
//   let card = cards[number];
//   if (checkWin("I ", card)) {
//     b = true;
//   }
//   setTimeout(removeCard.bind(null, card), 1000);
//   isGame = true;
//   return b;
// }

function checkWin(who) {
  info.innerHTML = who + " take";
  if (amount == 0) {
    info.innerHTML = who + " win";
    return true;
  }
  return false;
}
