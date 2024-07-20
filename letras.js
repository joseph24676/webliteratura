const words = ["AMORFINO", "POEMAS", "MUJER", "RENACER"];
const gridSize = 10;
const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));

// Fill grid with random letters
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
}

// Place words in the grid
function placeWord(word) {
    const dir = Math.random() > 0.5 ? 'horizontal' : 'vertical';
    const maxStartPos = gridSize - word.length;
    const startPos = Math.floor(Math.random() * (maxStartPos + 1));

    if (dir === 'horizontal') {
        const row = Math.floor(Math.random() * gridSize);
        for (let i = 0; i < word.length; i++) {
            grid[row][startPos + i] = word[i];
        }
    } else {
        const col = Math.floor(Math.random() * gridSize);
        for (let i = 0; i < word.length; i++) {
            grid[startPos + i][col] = word[i];
        }
    }
}

words.forEach(word => placeWord(word));

// Render the grid
const wordsearch = document.getElementById('wordsearch');
grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
        const cell = document.createElement('div');
        cell.textContent = letter;
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        wordsearch.appendChild(cell);
    });
});

// Track selected cells
let mouseDown = false; // Variable to track mouse down state
let selectedCells = [];

// Highlight selected cells on mouse down and move
wordsearch.addEventListener('mousedown', function(event) {
    mouseDown = true;
    handleCellClick(event);
});

wordsearch.addEventListener('mousemove', function(event) {
    if (mouseDown) {
        handleCellClick(event);
    }
});

document.addEventListener('mouseup', function() {
    mouseDown = false;
});

// Handle cell click and selection
function handleCellClick(event) {
    if (event.target.tagName === 'DIV' && !event.target.classList.contains('found')) {
        const row = parseInt(event.target.dataset.row, 10);
        const col = parseInt(event.target.dataset.col, 10);
        const cell = grid[row][col];

        // Toggle selection
        if (!event.target.classList.contains('selected')) {
            event.target.classList.add('selected');
            selectedCells.push([row, col]);
        } else {
            event.target.classList.remove('selected');
            selectedCells = selectedCells.filter(cell => !(cell[0] === row && cell[1] === col));
        }

        // Check if a word is found
        checkWords();
    }
}

// Check if any word is found
function checkWords() {
    const selectedWord = selectedCells.map(cell => grid[cell[0]][cell[1]]).join('');
    if (words.includes(selectedWord)) {
        alert(`¡Encontraste la palabra: ${selectedWord}!`);
        selectedCells.forEach(cell => {
            const index = cell[0] * gridSize + cell[1];
            wordsearch.children[index].classList.add('found');
            wordsearch.children[index].setAttribute('data-word', selectedWord); // Guarda la palabra encontrada en el atributo data-word
        });
        selectedCells = [];
    }
}

// Función para verificar si se encontraron todas las palabras
function checkAllWordsFound() {
    for (let word of words) {
        if (!wordsearch.querySelector(`.found[data-word="${word}"]`)) {
            return false;
        }
    }
    return true;
}

// Función para manejar el clic del botón "Terminado"
const finishButton = document.getElementById('finishButton');
finishButton.addEventListener('click', function() {
    if (checkAllWordsFound()) {
        alert("¡Felicidades!!");
    } else {
        alert("Faltan palabras");
    }
});
