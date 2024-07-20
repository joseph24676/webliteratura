const words = ["CARLOSFUENTES", "GABRIELGARCIA", "JULIOCORTAZAR", "MARIOVARGAS"];
const gridSize = 15;
let board = Array.from(Array(gridSize), () => Array(gridSize).fill(''));
let selectedCells = [];

// Función para llenar el tablero
const fillBoard = () => {
    for (let word of words) {
        placeWord(word);
    }

    // Llenar celdas vacías con letras aleatorias
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === '') {
                board[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
};

// Función para colocar una palabra en el tablero
const placeWord = (word) => {
    let placed = false;
    while (!placed) {
        let direction = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);

        if (direction === 0) { // Horizontal
            if (col + word.length <= gridSize && canPlaceWord(word, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    board[row][col + i] = word[i];
                }
                placed = true;
            }
        } else { // Vertical
            if (row + word.length <= gridSize && canPlaceWord(word, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    board[row + i][col] = word[i];
                }
                placed = true;
            }
        }
    }
};

// Función para verificar si se puede colocar una palabra en una posición
const canPlaceWord = (word, row, col, direction) => {
    for (let i = 0; i < word.length; i++) {
        if (direction === 0) { // Horizontal
            if (board[row][col + i] !== '' && board[row][col + i] !== word[i]) {
                return false;
            }
        } else { // Vertical
            if (board[row + i][col] !== '' && board[row + i][col] !== word[i]) {
                return false;
            }
        }
    }
    return true;
};

// Función para dibujar el tablero
const drawBoard = () => {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.textContent = board[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', selectCell);
            gameBoard.appendChild(cell);
        }
    }
};

// Función para seleccionar una celda
const selectCell = (event) => {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const cellId = `${row}-${col}`;

    if (selectedCells.includes(cellId)) {
        selectedCells = selectedCells.filter(id => id !== cellId);
        cell.classList.remove('selected');
    } else {
        selectedCells.push(cellId);
        cell.classList.add('selected');
    }
};

// Función para comprobar las palabras seleccionadas
const checkWords = () => {
    let allWordsFound = true;

    for (let word of words) {
        if (!isWordFound(word)) {
            allWordsFound = false;
            break;
        }
    }

    const resultDiv = document.getElementById('result');
    if (allWordsFound) {
        resultDiv.textContent = '¡Felicidades! Encontraste todas las palabras.';
        resultDiv.style.color = 'green';
    } else {
        const missingWords = words.filter(word => !isWordFound(word));
        resultDiv.textContent = `Palabras faltantes: ${missingWords.join(', ')}`;
        resultDiv.style.color = 'red';
    }
};

// Función para verificar si una palabra está encontrada
const isWordFound = (word) => {
    let directions = [[0, 1], [1, 0]]; // Horizontal y Vertical
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            for (let [dx, dy] of directions) {
                if (checkDirection(word, row, col, dx, dy)) {
                    return true;
                }
            }
        }
    }
    return false;
};

// Función para verificar una dirección específica para una palabra
const checkDirection = (word, row, col, dx, dy) => {
    let cells = [];
    for (let i = 0; i < word.length; i++) {
        let newRow = row + i * dx;
        let newCol = col + i * dy;
        if (newRow >= gridSize || newCol >= gridSize) {
            return false;
        }
        cells.push(`${newRow}-${newCol}`);
    }
    return cells.every(cell => selectedCells.includes(cell));
};

// Evento para el botón de comprobar palabras
document.getElementById('check-button').addEventListener('click', checkWords);

fillBoard();
drawBoard();
