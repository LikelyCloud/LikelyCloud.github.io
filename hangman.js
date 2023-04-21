const passwordView = document.getElementById("password-content");
const newGameButton = document.getElementById("new-game");
const hangman = document.getElementById("canvas");
const context = hangman.getContext("2d");
const letterBox = document.getElementById("letter-box");

const gameState = {
    password: "",
    uncovered_password: "",
    used_letters: new Set(),
    correct_letters: new Set(),
    tries: 0,
    win: false,
    words: ["archery", "badminton", "baseball", "bowling", "basketball", "cricket", "football", "golf", "hockey", "handball", "judo", "karate", "lacrosse", "rugby", "snowboarding", "sumo", "taekwondo", "volleyball", "windsurfing"]
};


function printState() {
    console.log("Password " + gameState.password);
    console.log("Uncovered password: " + gameState.uncovered_password);
    console.log("Correct letters: " + Array.from(gameState.correct_letters.values()));
    console.log("Used letters: " + Array.from(gameState.used_letters.values()));
}

function reset() {
    gameState.win = false;

    context.clearRect(0, 0, 400, 400);
    context.beginPath();

    gameState.password = gameState.words[Math.floor(Math.random() * gameState.words.length)];
    gameState.uncovered_password = gameState.password.split("").map((x) => "_ ").join("");

    gameState.tries = 10;

    gameState.correct_letters = new Set(gameState.password);
    gameState.used_letters = new Set();

    printState();
    saveToStorage();
}

function update_password() {
    return gameState.password.split("").map((x) => { return gameState.used_letters.has(x) ? `${x} ` : "_ "; }).join("");
}

function guessLetter(letter) {
    console.log("##################")
    if (isOver()) {
        return;
    }

    if (gameState.used_letters.has(letter)) {
        console.log("Already used letter " + letter);
    } else if (gameState.correct_letters.has(letter)) {
        console.log("Correct letter " + letter);
        gameState.used_letters.add(letter);
        gameState.uncovered_password = update_password();
        saveToStorage();
    } else {
        console.log("Wrong letter " + letter);
        gameState.used_letters.add(letter);
        gameState.tries -= 1;
        draw(gameState.tries);
        saveToStorage();
    }

    passwordView.innerHTML = gameState.uncovered_password;

    if (isOver()) {
        if (gameState.win) {
            alert("You've won!");
        } else {
            alert("You've lost!");
        }
    }

    printState();
}

function isOver() {
    if (gameState.tries == 0) {
        gameState.win = false;
        saveToStorage();
        return true;
    } else if (gameState.password === gameState.uncovered_password.replaceAll(" ", "")) {
        gameState.win = true;
        saveToStorage();
        return true;
    } else {
        return false;
    }
}

function drawFrame(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawCircle(x, y, radius, angle) {
    context.beginPath();
    context.arc(x, y, radius, angle, Math.PI * 2, true);
    context.stroke();
}

function draw(position) {
    switch (position) {
        case 9:
            drawFrame(40, 130, 260, 130);
            console.log("DRAW 9");
            break;
        case 8:
            drawFrame(45, 130, 45, 20);
            console.log("DRAW 8");
            break;
        case 7:
            drawFrame(45, 20, 180, 20);
            console.log("DRAW 7");
            break;
        case 6:
            drawFrame(180, 20, 180, 35);
            console.log("DRAW 6");
            break;
        case 5:
            drawCircle(180, 45, 10, 0);
            console.log("DRAW 5");
            break;
        case 4:
            drawFrame(180, 55, 180, 90);
            console.log("DRAW 4");
            break;
        case 3:
            drawFrame(180, 55, 150, 80);
            console.log("DRAW 3");
            break;
        case 2:
            drawFrame(180, 55, 210, 80);
            console.log("DRAW 2");
            break;
        case 1:
            drawFrame(180, 90, 150, 115);
            console.log("DRAW 1");
            break;
        case 0:
            drawFrame(180, 90, 210, 115);
            console.log("DRAW 0");
            break;
    }
}

function saveToStorage() {
    localStorage.setItem("password", gameState.password);
    localStorage.setItem("uncovered_password", gameState.uncovered_password);
    localStorage.setItem("used_letters", JSON.stringify(Array.from(gameState.used_letters.values())));
    localStorage.setItem("correct_letters", JSON.stringify(Array.from(gameState.correct_letters.values())));
    localStorage.setItem("tries", gameState.tries);
    localStorage.setItem("win", gameState.win);
}

function restoreFromLocalStorage() {
    gameState.password = localStorage.getItem("password");
    gameState.uncovered_password = localStorage.getItem("uncovered_password");
    gameState.used_letters = new Set(JSON.parse(localStorage.getItem("used_letters")));
    gameState.correct_letters = new Set(JSON.parse(localStorage.getItem("correct_letters")));
    gameState.tries = +localStorage.getItem("tries");
    gameState.win = localStorage.getItem("win") === "true";

    const blueButtons = letterBox.children;


    for (elem of gameState.used_letters) {
        blueButtons[elem.charCodeAt() - 97].classList.add("light-blue");
    }

    for (let i = 9; i >= gameState.tries; --i) {
        draw(i);
    }
}

window.onload = () => {

    for (let i = 0; i < 26; ++i) {
        const letter = document.createElement("div");

        letter.classList.add("letter");
        letter.innerHTML = String.fromCharCode(65 + i);
        letter.addEventListener("click", () => {
            if (!isOver()) {
                letter.classList.add("light-blue");
                guessLetter(String.fromCharCode(97 + i));
            }
        })

        letterBox.appendChild(letter);
    }

    newGameButton.addEventListener("click", () => {
        reset();
        passwordView.innerHTML = gameState.uncovered_password;

        let usedButtons = document.getElementsByClassName("light-blue");
        Array.from(usedButtons).forEach(function (elem) {
            elem.classList.remove("light-blue");
        });
    });

    if (localStorage.length != 0) {
        restoreFromLocalStorage();
    } else {
        reset();
    }

    passwordView.innerHTML = gameState.uncovered_password;

}

// telefony
