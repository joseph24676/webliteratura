const puzzle = document.getElementById('puzzle');
const size = 4;
let tiles = [];
let initialPositions = [];
let draggedTile = null;

function createPuzzle() {
    tiles = [];
    initialPositions = [];
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.style.backgroundImage = "url('rompe.png')";
            tile.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
            tile.dataset.row = row;
            tile.dataset.col = col;
            initialPositions.push({ row: row, col: col, element: tile });
            tile.draggable = true;
            tile.addEventListener('dragstart', onDragStart);
            tile.addEventListener('dragover', onDragOver);
            tile.addEventListener('drop', onDrop);
            if (row === size - 1 && col === size - 1) {
                tile.classList.add('hidden');
            }
            puzzle.appendChild(tile);
            tiles.push(tile);
        }
    }
}

function onDragStart(event) {
    draggedTile = event.target;
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const targetTile = event.target;
    if (targetTile.classList.contains('tile')) {
        const draggedRow = draggedTile.dataset.row;
        const draggedCol = draggedTile.dataset.col;
        const targetRow = targetTile.dataset.row;
        const targetCol = targetTile.dataset.col;

        if ((Math.abs(draggedRow - targetRow) + Math.abs(draggedCol - targetCol)) === 1) {
            [draggedTile.dataset.row, draggedTile.dataset.col, targetTile.dataset.row, targetTile.dataset.col] =
                [targetRow, targetCol, draggedRow, draggedCol];

            draggedTile.style.backgroundPosition = `${-targetCol * 100}px ${-targetRow * 100}px`;
            targetTile.style.backgroundPosition = `${-draggedCol * 100}px ${-draggedRow * 100}px`;
        }
    }
}

let shuffleCount = 0;

function shuffle() {
    if (shuffleCount < 8) {
        for (let i = 0; i < 1000; i++) {
            const emptyTile = tiles.find(tile => tile.classList.contains('hidden'));
            const emptyRow = parseInt(emptyTile.dataset.row);
            const emptyCol = parseInt(emptyTile.dataset.col);
            const possibleMoves = tiles.filter(tile => {
                const row = parseInt(tile.dataset.row);
                const col = parseInt(tile.dataset.col);
                const isAdjacent = (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;
                return isAdjacent;
            });
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            moveTile(parseInt(randomMove.dataset.row), parseInt(randomMove.dataset.col));
        }
        shuffleCount++;
    } else {
        resetPuzzle();
    }
}

function resetPuzzle() {
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        const initialPosition = initialPositions[i];
        const row = initialPosition.row;
        const col = initialPosition.col;
        tile.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
        tile.dataset.row = row;
        tile.dataset.col = col;
        if (row === size - 1 && col === size - 1) {
            tile.classList.add('hidden');
        } else {
            tile.classList.remove('hidden');
        }
    }
    shuffleCount = 0;
}


function moveTile(row, col) {
    const emptyTile = tiles.find(tile => tile.classList.contains('hidden'));
    const emptyRow = parseInt(emptyTile.dataset.row);
    const emptyCol = parseInt(emptyTile.dataset.col);
    const isAdjacent = (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;
    
    if (isAdjacent) {
        emptyTile.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
        emptyTile.dataset.row = row;
        emptyTile.dataset.col = col;
        
        const clickedTile = tiles.find(tile => tile.dataset.row == row && tile.dataset.col == col);
        clickedTile.style.backgroundPosition = `${-emptyCol * 100}px ${-emptyRow * 100}px`;
        clickedTile.dataset.row = emptyRow;
        clickedTile.dataset.col = emptyCol;
    }
}

function checkPuzzle() {
    let solved = true;
    for (let initialPosition of initialPositions) {
        const tile = initialPosition.element;
        const row = parseInt(tile.dataset.row);
        const col = parseInt(tile.dataset.col);
        if (row !== initialPosition.row || col !== initialPosition.col) {
            solved = false;
            break;
        }
    }
    if (solved) {
        alert("¡Felicidades! Has armado correctamente la imagen.");
    } else {
        alert("Incorrecto. la imagen no está correctamente armado.");
    }
}

createPuzzle();
shuffle();