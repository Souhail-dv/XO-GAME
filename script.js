const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let xIsNext = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', startGame);

function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

    const currentClass = xIsNext ? 'x' : 'o';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateStatus();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
    xIsNext = !xIsNext;
}

function updateStatus() {
    status.textContent = `${xIsNext ? "X" : "O"}'s Turn`;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        status.textContent = "Game Draw!";
    } else {
        status.textContent = `${xIsNext ? "X" : "O"} Wins!`;
    }
}

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    xIsNext = true;
    gameActive = true;
    updateStatus();
}
