 let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector(".main")

let mainMsg = document.querySelector(".main-reset-msg")
let yesBtn = document.querySelector(".yes")
let noBtn = document.querySelector(".no")

/* ===== Animation Helpers ===== */
function animShow(el, animClass) {
  animClass = animClass || "anim-slide-in";
  el.classList.remove("hide", "msg2", "main2");
  el.classList.remove("anim-slide-out", "anim-pop-out", "anim-fade-out");
  void el.offsetWidth;
  el.classList.add(animClass);
  el.addEventListener("animationend", function handler(e) {
    if (e.target !== el) return;
    e.stopPropagation();
    el.classList.remove(animClass);
    el.removeEventListener("animationend", handler);
  });
}

function animHide(el, animClass) {
  animClass = animClass || "anim-slide-out";
  el.classList.remove("anim-slide-in", "anim-pop-in", "anim-fade-in");
  void el.offsetWidth;
  el.classList.add(animClass);
  el.addEventListener("animationend", function handler(e) {
    if (e.target !== el) return;
    e.stopPropagation();
    el.classList.remove(animClass);
    el.classList.add("hide");
    el.removeEventListener("animationend", handler);
  });
}

function msgap() {
  animHide(main, "anim-fade-out");
  animShow(mainMsg, "anim-pop-in");
}

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  boxes.forEach((box) => {
    box.classList.remove("x-mark", "o-mark", "win-glow");
  });
  animHide(msgContainer, "anim-pop-out");
  main.classList.remove("main2");
  main.style.display = "";
  animShow(main, "anim-fade-in");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.classList.add("o-mark");
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.classList.add("x-mark");
      turnO = true;
    }
    box.disabled = true;
    count++;

    // Box pop animation
    box.classList.add("box-pop");
    box.addEventListener("animationend", function handler() {
      box.classList.remove("box-pop");
      box.removeEventListener("animationend", handler);
    });

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      main.classList.add("main2");
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msg.style.color = "#a78bfa";
  msg.style.textShadow = "0 0 15px rgba(167, 139, 250, 0.5)";
  main.classList.remove("main2");
  main.style.display = "";
  animHide(main, "anim-fade-out");
  animShow(msgContainer, "anim-pop-in");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msg.style.color = "#facc15";
  msg.style.textShadow = "0 0 15px rgba(250, 204, 21, 0.5)";
  main.classList.remove("main2");
  main.style.display = "";
  animHide(main, "anim-fade-out");
  animShow(msgContainer, "anim-pop-in");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        main.classList.add("main2");
        // Add win glow to winning boxes
        boxes[pattern[0]].classList.add("win-glow");
        boxes[pattern[1]].classList.add("win-glow");
        boxes[pattern[2]].classList.add("win-glow");
        showWinner(pos1Val);
        return true;
      }
    }
  }
};



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", msgap);
yesBtn.addEventListener("click", () => {
  mainMsg.classList.add("msg2");
  mainMsg.style.display = "";
  main.classList.remove("main2");
  main.style.display = "";
  resetGame();
})
noBtn.addEventListener("click", () => {
  animHide(mainMsg, "anim-pop-out");
  mainMsg.addEventListener("animationend", function handler() {
    mainMsg.classList.add("msg2");
    mainMsg.style.display = "";
    main.classList.remove("main2");
    main.style.display = "";
    animShow(main, "anim-fade-in");
    mainMsg.removeEventListener("animationend", handler);
  });
})