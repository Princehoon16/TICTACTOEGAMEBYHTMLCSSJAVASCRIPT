let boxes = document.querySelectorAll('.box');
// let reset = document.querySelector('#reset-btn');
let resetBtn = document.getElementById('reset-btn');
// let newGameBtn = document.querySelector('#new-btn');
let newGameBtn = document.getElementById('new-btn');
// let messageContainer = document.getElementsByClassName('msg-container');
let msgContainer = document.querySelector('.msg-container');
// let msg = document.querySelector('#msg');
let msg = document.getElementById('msg');
let container = document.querySelector('.container');


let turnO = true; // playerX , playerO
let count = 0;  // To Track Draw

// 0 1 2
// 3 4 5
// 6 7 8

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide"); // Show reset button
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            //playerO
            box.innerText = "O";
            turnO = false;
        } else {
            //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    container.classList.add("hide");
    resetBtn.classList.add("hide"); // Hide reset button      

    speakCongratulation("It's a draw! Better luck next time!");

    // Show draw emojis with GSAP animation

    const emojiContainer = document.getElementById('emoji-container');
    emojiContainer.innerHTML = '😐🤷‍♂️'; // Set the emoji container directly to the draw emojis
    gsap.from(".emoji", {
        duration: 1,
        scale: 7, // Start from scale 0 (zoom effect)
        opacity: 0,
        y: -100, // Start from above the screen
        ease: "power3.out", // Easing function for smooth animation
        stagger: 0.2 // Stagger effect for sequential animation
    });
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


const hideGame = () => {
    container.classList.add("hide");
};

const showGame = () => {
    container.classList.remove("hide");
};

const { gsap } = window;



// Function to speak congratulatory messages

const speakCongratulation = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    window.speechSynthesis.speak(speech);
};
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    container.classList.add("hide");
    resetBtn.classList.add("hide"); // Hide reset button

    // Speak congratulatory message

    speakCongratulation(`Congratulations, ${winner}! You win the game!`);


    // Show congratulation emojis with GSAP animation

    // gsap.from(".emoji", { duration: 1, y: -50, opacity: 0, stagger: 0.2 });


    const winnerEmojis = ['🎉', '👏', '🥳']; // Winner emojis
    const emojiContainer = document.getElementById('emoji-container');
    winnerEmojis.forEach(emoji => {
        const span = document.createElement('span');
        span.classList.add('emoji');
        span.innerText = emoji;
        emojiContainer.appendChild(span);

    });

    gsap.from(".emoji", {
        duration: 1,
        scale: 0, // Start from scale 0 (zoom effect)
        opacity: 0,
        y: -100, // Start from above the screen
        ease: "power3.out", // Easing function for smooth animation
        stagger: 0.2 // Stagger effect for sequential animation
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

// newGameBtn.addEventListener("click", resetGame);
// resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", () => {
    resetGame();
    showGame(); // Show the game container when starting a new game
});

resetBtn.addEventListener("click", () => {
    resetGame();
    showGame(); // Show the game container when resetting the game
});