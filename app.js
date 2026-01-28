// ================= GAME STATE =================
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];

let started = false;
let acceptingInput = false;
let level = 0;

let h2 = document.querySelector("h2");
let progressBar = document.getElementById("progressBar");
let startBtn = document.getElementById("startBtn");

// ================= START GAME =================
startBtn.addEventListener("click", () => {
  if (!started) {
    started = true;
    startBtn.disabled = true;
    levelUp();
  }
});

// ================= FLASH EFFECTS =================
function gameFlash(btn) {
  btn.classList.add("flash");
  playSound(btn.id);
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  playSound(btn.id);
  setTimeout(() => btn.classList.remove("userFlash"), 200);
}

// ================= LEVEL UP =================
function levelUp() {
  userSeq = [];
  level++;
  acceptingInput = false;

  h2.innerText = `Level ${level}`;

  let progress = Math.min(level * 10, 100);
  progressBar.style.width = `${progress}%`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  let randBtn = document.getElementById(randColor);

  setTimeout(() => {
    gameFlash(randBtn);
    acceptingInput = true;
  }, 500);
}

// ================= CHECK ANSWER =================
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    gameOver();
  }
}

// ================= BUTTON PRESS =================
function btnPress() {
  if (!started || !acceptingInput) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.id;
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// ================= GAME OVER =================
function gameOver() {
  playSound("wrong");

  document.body.classList.add("game-over");
  setTimeout(() => document.body.classList.remove("game-over"), 600);

  h2.innerHTML = `💥 Game Over! Score: <b>${level}</b><br>Press Start to play again`;
  reset();
}

// ================= RESET =================
function reset() {
  started = false;
  acceptingInput = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
  progressBar.style.width = "0%";
  startBtn.disabled = false;
}

// ================= EVENT LISTENERS =================
document.querySelectorAll(".btn")
  .forEach(btn => btn.addEventListener("click", btnPress));

// ================= SOUNDS =================
let sounds = {
  yellow: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-bonus-earned-in-video-game-2058.mp3"),
  red: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3"),
  green: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-interface-option-select-2573.mp3"),
  purple: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav"),
  wrong: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3")
};

function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0;
    sounds[color].play();
  }
}
