const grid = document.getElementById('grid');
const scoreElement = document.getElementById('score');
let score = 0;
let openedCells = 0;

const rows = 5;
const cols = 5;
const totalCells = rows * cols;
const totalMines = 5;

function createGrid() {
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        const star = document.createElement('div');
        star.classList.add('star');
        cell.appendChild(star);

        const mine = document.createElement('div');
        mine.classList.add('mine');
        cell.appendChild(mine);

        cell.addEventListener('click', () => openCell(cell));
        grid.appendChild(cell);
    }
}

function setupMinesAndStars() {
    let mines = new Set();
    while (mines.size < totalMines) {
        mines.add(Math.floor(Math.random() * totalCells));
    }

    for (let i = 0; i < totalCells; i++) {
        if (mines.has(i)) {
            grid.children[i].dataset.mine = 'true';
        } else {
            grid.children[i].dataset.star = 'true';
        }
    }
}

function openCell(cell) {
    if (cell.classList.contains('open')) return;

    cell.classList.add('open');
    openedCells++;
    if (cell.dataset.mine) {
        cell.classList.add('mine-open');
        cell.querySelector('.star').style.display = 'none';
        score = 0;
        scoreElement.textContent = `Очки: ${score}`;
    } else if (cell.dataset.star) {
        cell.querySelector('.star').style.display = 'block';
        score++;
        scoreElement.textContent = `Очки: ${score}`;
    }

    if (openedCells === totalCells) {
        setTimeout(() => {
            alert(`Игра окончена! Ваш итоговый счет: ${score}`);
            resetGame();
        }, 100);
    }
}

function resetGame() {
    score = 0;
    openedCells = 0;
    scoreElement.textContent = `Очки: ${score}`;
    grid.innerHTML = '';
    createGrid();
    setupMinesAndStars();
}

createGrid();
setupMinesAndStars();
