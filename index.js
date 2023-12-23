const MAX_WORDS = 4;

function drawWordBank(container, word = "") {
  const row = document.createElement("div");
  row.id = `row`;
  row.className = "line";
  for (let i = 0; i < word.length; i++) {
    const box = document.createElement("div");
    box.className = "box";
    box.id = `box/${i}/${word[i]}`;
    box.textContent = word[i];
    box.addEventListener("click", function (e) {
      const el = e.target;
      if (el.id !== "newLine") {
        el.parentNode.removeChild(el);
      }
    });
    row.appendChild(box);
  }
  container.appendChild(row);
  return row;
}

function appendRow() {
  const gridEl = document.getElementById("grid");
  const row = document.createElement("div");
  const currentRows = document.getElementById("grid").children.length;
  if (currentRows >= MAX_WORDS) {
    return;
  }
  row.id = `row/${currentRows}`;
  const box = document.createElement("div");
  box.className = "box";
  box.textContent = "";
  box.id = `row/${currentRows}/box/${0}`;
  row.appendChild(box);
  gridEl.appendChild(row);
}

function appendCharacterToFirstAvailRow() {}

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
  const bank = ["pizza", "cake", "steak", "potato"];
  let combinedBank = bank.join("");
  combinedBank = shuffle(combinedBank);
  const bankEl = document.getElementById("bank");

  drawWordBank(bankEl, combinedBank);
  const newLineEl = document.createElement("div");
  newLineEl.id = "newLine";
  newLineEl.className = "newLine";
  newLineEl.textContent = "New Line";
  newLineEl.addEventListener("click", function (e) {
    appendRow();
  });
  bankEl.appendChild(newLineEl);
}

function init() {
  drawGrid();
  drawBank();
}

init();
