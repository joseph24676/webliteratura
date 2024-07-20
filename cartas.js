const cards = [
    { name: "Rubén Darío", id: 1 },
    { name: "Rubén Darío", id: 1 },
    { name: "Jorge Luis Borges", id: 2 },
    { name: "Jorge Luis Borges", id: 2 },
    { name: "Ireneo Funes", id: 3 },
    { name: "Ireneo Funes", id: 3 },
    { name: "Bernardo Haedo", id: 4 },
    { name: "Bernardo Haedo", id: 4 }
];

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let matchedPairs = 0;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const shuffledCards = shuffleArray(cards);
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `
            <div class="card-content card-front">${card.name}</div>
            <div class="card-content card-back">?</div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    matchedPairs = 0;
    document.getElementById('win-message').classList.remove('show');
}

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function flipCard() {
    if (boardLocked) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    boardLocked = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
        showWinMessage();
    }
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    boardLocked = false;
}

function showWinMessage() {
    const winMessage = document.getElementById('win-message');
    winMessage.classList.add('show');
}

document.getElementById('reset-button').addEventListener('click', createBoard);

createBoard();
