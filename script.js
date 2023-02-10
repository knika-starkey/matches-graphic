let maxM = 20;
let minM = 10;
let amount = Math.floor(Math.random() * (maxM - minM) + minM);
let mathesF = document.getElementById("match");
let infoDiv = document.getElementById("info");
let amountPlace = document.getElementById("amount");
let pullButton = document.getElementById("pullCard");
let choosen = [];
let ready = false;
let isGame = true;

console.log(amount);

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

function removeMatch(n) {
  amount -= n;
  amountPlace.innerHTML = amount;
  //mathesF.innerHTML = generateMatches(amount, mathesF);
  choosen = [];
  generateMatches(amount, mathesF);
  addEventCardList();
}

function addEventCardList() {
  let mathElements = document.getElementsByClassName("math-st");

  for (let i = 0; i < mathElements.length; i++) {
    mathElements[i].addEventListener("click", myMove);
  }
}

// function play(event) {
//   if (!isGame) return;
//   let el = event.target;
//   //   let elId = el.id;
//   try {
//     if (myMove(event)) return;
//     setTimeout(computerMove, 2000);
//   } catch (ex) {
//     info.innerHTML = ex.message;
//   }
// }

function myMove(e) {
  let b = false;
  let elId = e.target.id;
  let mat = elId.substr(3);
  if (!choosen.includes(mat) && choosen.length <= 2) {
    choosen.push(mat);
    e.target.src = "./images/match-fire.png";
    e.target.classList.add("burn");
  }
  console.log(choosen);
  if (ready) {
    if (checkWin("You ")) {
      b = true;
    } else {
      // setTimeout(removeMatch.bind(choosen.length), 1000);
      console.log(amount);
    }
  }
  return b;
}

function computerMove() {
  isGame = false;
  let b = false;
  let number = Math.floor(Math.random() * amount);
  let count = (amount - 1) % 4 == 0 ? 1 : (amount - 3) % 4 == 0 ? 3 : 2;
  let mArr = [];
  while (mArr.length < count) {
    number = Math.floor(Math.random() * amount);
    if (!mArr.includes(number)) {
      mArr.push(number);
      let match = document.getElementById("rc_" + number);
      match.src = "./images/match-fire.png";
      match.classList.add("burn");
    }
  }

  if (checkWin("I ")) {
    b = true;
  } else {
    let burningMatches = document.getElementsByClassName("burn");
    for (let i = 0; i < burningMatches.length; i++) {
      burningMatches[i].src = "./images/match-burnt.png";
    }
    setTimeout(removeMatch.bind(null, count), 3000);
  }
  isGame = true;
  return b;
}

function checkWin(who) {
  infoDiv.innerHTML = who + " take";
  if (amount <= 0) {
    alert(who + " win");
    return true;
  }
  return false;
}

function pull() {
  ready = true;
  let burningMatches = document.getElementsByClassName("burn");
  for (let i = 0; i < burningMatches.length; i++) {
    burningMatches[i].src = "./images/match-burnt.png";
  }
  //removeMatch(burningMatches.length);
  setTimeout(removeMatch.bind(null, burningMatches.length), 500);
  setTimeout(computerMove, 3000);
}

window.onload = function () {
  generateMatches(amount, mathesF);
  addEventCardList();
  pullButton.addEventListener("click", pull);
};
