const MAX_WORDS = 4;
const BANK_ROW_ID = "bankRow";
const bank = ["pizza", "cake", "steak", "potato"];
let combinedBank = bank.join("");

function createBox(id, className, textContent) {
  const box = document.createElement("div");
  box.className = className;
  box.id = id;
  box.textContent = textContent;
  return box;
}

function drawBankBox(bank, letter) {
  const box = createBox(
    /* id= */ `box/${letter}`,
    /* className= */ "box",
    /* textContent= */ letter
  );
  box.addEventListener("click", function (e) {
    const el = e.target;
    if (el.id !== "newLine") {
      el.parentNode.removeChild(el);
      const split = el.id.split("/");
      const letter = split[split.length - 1];
      appendLetterToFirstAvailRow(letter);
      combinedBank = combinedBank.replace(letter, "");
    }
  });
  bank.appendChild(box);
}

function drawWordBank(container, word = "") {
  const row = document.createElement("div");
  row.id = BANK_ROW_ID;
  row.className = "line";
  for (let i = 0; i < word.length; i++) {
    drawBankBox(row, word[i]);
  }
  container.appendChild(row);
}

function appendRow() {
  const gridEl = document.getElementById("grid");
  const currentRows = document.getElementById("grid").children.length;
  if (currentRows >= MAX_WORDS) {
    return;
  }
  const row = document.createElement("div");
  row.id = `row/${currentRows + 1}`;
  row.className = "line";
  const box = createBox(
    /* id= */ `row/${currentRows + 1}/box/BLANK`,
    /* className= */ "box",
    /* textContent= */ ""
  );
  row.appendChild(box);
  gridEl.appendChild(row);
}

function appendToBank(letter) {
  combinedBank = combinedBank + letter;
  const bankEl = document.getElementById(BANK_ROW_ID);
  drawBankBox(bankEl, letter);
}

function appendLetterToFirstAvailRow(letter) {
  const currentRows = document.getElementById("grid").children.length;
  const row = document.getElementById(`row/${currentRows}`);
  const blankEl = document.getElementById(`row/${currentRows}/box/BLANK`);
  blankEl.parentNode.removeChild(blankEl);

  const box = createBox(
    /* id= */ `row/${currentRows}/box/${letter}`,
    /* className= */ "box",
    /* textContent= */ letter
  );
  box.addEventListener("click", function (e) {
    const el = e.target;
    el.parentNode.removeChild(el);
    const split = el.id.split("/");
    const letter = split[split.length - 1];
    appendToBank(letter);
  });
  row.appendChild(box);
  row.appendChild(blankEl);
}

function shuffle(word) {
  const a = word.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

function drawGrid() {
  appendRow();
}

function drawBank() {
  combinedBank = shuffle(combinedBank);
  const bankEl = document.getElementById("bank");

  drawWordBank(bankEl, combinedBank);

  const optionsEl = document.getElementById("options");
  const newLineEl = document.createElement("div");
  newLineEl.id = "newLine";
  newLineEl.className = "newLine";
  newLineEl.textContent = "New Line";
  newLineEl.addEventListener("click", function () {
    appendRow();
  });
  optionsEl.appendChild(newLineEl);
  const shuffleEl = document.createElement("img");
  shuffleEl.src = "../icons/random-icon.svg";
  shuffleEl.alt = "Shuffle button";
  shuffleEl.className = "shuffle";
  shuffleEl.addEventListener("click", function () {
    combinedBank = shuffle(combinedBank);
    const bankEl = document.getElementById("bank");
    while (bankEl.firstChild) {
      bankEl.removeChild(bankEl.lastChild);
    }
    drawWordBank(bankEl, combinedBank);
  });
  optionsEl.appendChild(shuffleEl);
}

function init() {
  drawGrid();
  drawBank();
}

init();
