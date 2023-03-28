// find  start-game button and click it
document.querySelector(".controls .start-game").onclick = function () {
  let yourname = prompt("whats your name ?");
  if (yourname == "" || yourname == null) {
    document.querySelector(".info-container .name span").innerHTML = "unknown";
  } else {
    document.querySelector(".info-container .name span").innerHTML = yourname;
  }

  document.querySelector(".controls").remove();
};

let duration = 1000;
// get container div
let gamecontainer = document.querySelector(".game-memory-container");
// get elements inside conatiner as array
let blocks = Array.from(gamecontainer.children);

// let orderrange = [...Array(blocks.length).keys()];
let orderrange = Array.from(Array(blocks.length).keys());
shuffle(orderrange);

blocks.forEach((block, index) => {
  block.style.order = orderrange[index];
  block.addEventListener("click", function () {
    // this mean block that i clicked it
    flibblock(this);
  });
});

// flibblock function
function flibblock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  // collect flibed block
  let allfillibedBlock = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allfillibedBlock.length == 2) {
    // when i slected two cards must stop click
    stopclicking();
    checkMatchedBlock(allfillibedBlock[0], allfillibedBlock[1]);
  }
}

function stopclicking() {
  gamecontainer.classList.add("no-clicking");
  setTimeout(() => {
    gamecontainer.classList.remove("no-clicking");
  }, duration);
}
// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}

// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
/*
  [1] Save Current Element in Stash
  [2] Current Element = Random Element
  [3] Random Element = Get Element From Stash
*/
// 1:2
function checkMatchedBlock(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  //  comparsion by dataset
  if (firstBlock.dataset.technology == secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.remove("has-match");
    secondBlock.classList.remove("has-match");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
 
  // data-technology
}
