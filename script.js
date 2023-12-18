
let boxes = document.querySelectorAll('.box');

let turn = "X";
let isGameOver = false;
let isComputerTurn = false;

// Function to add event listeners to the boxes
boxes.forEach( box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && !isComputerTurn && box.innerHTML === "") {
            box.innerHTML = turn;
            box.classList.remove("computer");
            checkWin();
            checkDraw();
            changeTurn();
            if (!isGameOver) {
                isComputerTurn = true;
                computerMove();
            }
        }
    })
})

// Function to check for a possible winning move for the computer
function checkForWinningMove(turn) {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i<winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 === turn && v0 === v1 && v0 === v2) {
            return true;
        }
    };
    return false;
}

let thinkingIndicator = document.getElementById("thinking-indicator");
// Function to make the computer move
function computerMove() {
    // Indicate that the computer is thinking
    thinkingIndicator.innerHTML = "Thinking...";
    isComputerTurn = true;
    setTimeout(() => {
        let emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
        if (emptyBoxes.length > 0) {
            // Check if there is a winning move for the player
            let userWinningMove = false;
            for (let i = 0; i<emptyBoxes.length; i++) {
                emptyBoxes[i].innerHTML = "X";
                if (checkForWinningMove("X")) {
                    emptyBoxes[i].innerHTML = turn;
                    emptyBoxes[i].classList.add("computer");
                    emptyBoxes[i].style.color = "rgb(33, 154, 187)";
                    checkWin();
                    checkDraw();
                    changeTurn();
                    userWinningMove = true;
                    break;
                }
                emptyBoxes[i].innerHTML = "";
            }
            // If a winning move was found for the user, return from the function
            if (userWinningMove) {
                thinkingIndicator.innerHTML = "";
                isComputerTurn = false;
                return;
            }

            // Check if there is a winning move for the computer
            let winningMove = false;
            for (let i = 0; i<emptyBoxes.length; i++) {
                emptyBoxes[i].innerHTML = "O";
                if (checkForWinningMove("O")) {
                    emptyBoxes[i].classList.add("computer");
                    emptyBoxes[i].style.color = "rgb(33, 154, 187)";
                    checkWin();
                    checkDraw();
                    changeTurn();
                    winningMove = true;
                    break;
                }
                emptyBoxes[i].innerHTML = "";
            }
            // If a winning move was found, return from the function
            if (winningMove) {
                thinkingIndicator.innerHTML = "";
                isComputerTurn = false;
                return;
            }
            let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            randomBox.innerHTML = turn;
            randomBox.classList.add("computer");
            randomBox.style.color = "rgb(33, 154, 187)";
            checkWin();
            checkDraw();
            changeTurn();
        }
        thinkingIndicator.innerHTML = "";
        isComputerTurn = false;
    }, 1000); // 1000 milliseconds = 1 second
}

// Function to change the turn
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Function to check if the game is over
function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i<winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#play-again").style.display = "inline"

            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "lightcoral"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

// Function to check if the game is a draw
function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach( e => {
            if(e.innerHTML === "") {
                isDraw = false;
            }
        })

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

// Function to reset the game
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    // document.querySelector(".box.computer").style.color = "rgb(33, 154, 187)";

    resetBoxStyles();
})

// Function to reset the box styles
function resetBoxStyles() {
    boxes.forEach( e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "black";
        e.classList.remove("computer");
    });
}
