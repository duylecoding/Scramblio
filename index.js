const MAX_WORDS = 4;

function createBox(id, className, textContent) {
  const box = document.createElement("div");
  box.className = className;
  box.id = id;
  box.textContent = textContent;
  return box;
}

function drawWordBank(container, word = "") {
  const row = document.createElement("div");
  row.id = `row`;
  row.className = "line";
  for (let i = 0; i < word.length; i++) {
    const box = createBox(
      /* id= */ `box/${i}/${word[i]}`,
      /* className= */ "box",
      /* textContent= */ word[i]
    );
    box.addEventListener("click", function (e) {
      const el = e.target;
      if (el.id !== "newLine") {
        el.parentNode.removeChild(el);
        const split = el.id.split("/");
        appendLetterToFirstAvailRow(split[split.length - 1]);
      }
    });
    row.appendChild(box);
  }
  container.appendChild(row);
  return row;
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
