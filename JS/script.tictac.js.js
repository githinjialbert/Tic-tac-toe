document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll(".cells");
    const players = ["X", "O"];
    let currentPlayer = players[0];
    const restartBtn = document.getElementById("restart-button");
    const resultMsg = document.getElementById("result-message");
    const winnerMsg = document.getElementById("winner-message");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]
    ];

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if(cell.innerText === "") {
                cell.innerText = currentPlayer;

                // Check for a win or tie after the move
                if (checkWin()) {
                    winnerMsg.innerText = `Player ${currentPlayer === "X" ? "1" : "2"} won!`;
                    return;
                }

                if (checkTie()) {
                    resultMsg.innerText = "It's a tie!";
                    return;
                }

                // Switch player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });
    });

    const checkWin = () => {
        const board = Array.from(cells).map(cell => cell.innerText);
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const checkTie = () => {
        const allFilled = Array.from(cells).every(cell => cell.innerText !== "");
        return allFilled && !checkWin();
    };

    const resetGame = () => {
        cells.forEach(cell => {
            cell.innerText = "";
        });
        currentPlayer = players[0];
        resultMsg.innerText = "";
        winnerMsg.innerText = "";
    };

    restartBtn.addEventListener('click', resetGame);
});