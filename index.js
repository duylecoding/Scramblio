const MAX_WORDS = 4;
const BANK_ROW_ID = "bankRow";
const bank = ["tree", "mistletoe", "cane", "santa"];
let combinedBank = bank.join("");
let nextAvailableId = 0;

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
  const newRowId = nextAvailableId + 1;
  row.id = `row/${newRowId}`;
  row.className = "line";
  const box = createBox(
    /* id= */ `row/${newRowId}/box/BLANK`,
    /* className= */ "underline",
    /* textContent= */ ""
  );
  removeBlankAtRow(findPreviousRowId(newRowId));
  row.appendChild(box);
  gridEl.appendChild(row);
  addRemoveButtonToRow(findPreviousRowId(newRowId));
}

function removeRow(rowId) {
  const gridEl = document.getElementById("grid");
  const row = document.getElementById(`row/${rowId}`);
  if (row) {
    gridEl.removeChild(row);
  }
}

function findPreviousRowId(rowId) {
  let id = rowId - 1;
  while (!document.getElementById(`row/${id}`)) {
    if (id === 0) {
      break;
    }
    id--;
  }

  return id;
}

function addRemoveButtonToRow(rowId) {
  const parent = document.getElementById(`row/${rowId}`);
  if (!parent) {
    return;
  }

  const removeWrapper = document.createElement("div");
  removeWrapper.className = "iconWrapper";
  removeWrapper.id = `iconWrapper/${rowId}`;
  const removeEl = document.createElement("img");
  removeEl.src = "../icons/close-icon.svg";
  removeEl.alt = "Remove button";
  removeEl.className = "shuffle";
  removeEl.id = `remove/${rowId}`;
  removeWrapper.addEventListener("click", function (e) {
    removeRow(e.target.id.split("/")[1]);
  });
  removeWrapper.appendChild(removeEl);
  parent.appendChild(removeWrapper);
}

function removeBlankAtRow(rowId) {
  const parent = document.getElementById(`row/${rowId}`);
  const blankEl = document.getElementById(`row/${rowId}/box/BLANK`);
  if (blankEl) {
    parent.removeChild(blankEl);
  }
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
  const newRowId = nextAvailableId + 1;

  const box = createBox(
    /* id= */ `row/${newRowId}/box/${letter}`,
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
  const shuffleWrapper = document.createElement("div");
  shuffleWrapper.className = "iconWrapper";
  const shuffleEl = document.createElement("img");
  shuffleEl.src = "../icons/random-icon.svg";
  shuffleEl.alt = "Shuffle button";
  shuffleEl.className = "shuffle";
  shuffleWrapper.addEventListener("click", function () {
    combinedBank = shuffle(combinedBank);
    const bankEl = document.getElementById("bank");
    while (bankEl.firstChild) {
      bankEl.removeChild(bankEl.lastChild);
    }
    drawWordBank(bankEl, combinedBank);
  });
  shuffleWrapper.appendChild(shuffleEl);
  optionsEl.appendChild(shuffleWrapper);
}

function init() {
  drawGrid();
  drawBank();
}

init();
