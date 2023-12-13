
let boxes = document.querySelectorAll('.box');

let turn = "X";
let isGameOver = false;

// Function to add event listeners to the boxes
boxes.forEach( box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    })
})

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
    };
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

    resetBoxStyles();
})

// Function to reset the box styles
function resetBoxStyles() {
    boxes.forEach( e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "black";
    });
}
