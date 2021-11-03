// DOM Refs
const playBtn = document.querySelector('#play-btn');
const difficultySelect = document.querySelector('#difficulty');
const wrapGridEl = document.querySelector('.wrap-grid');

// Gen Grid
playBtn.addEventListener('click', () => {
    // Clear grid
    wrapGridEl.innerHTML = '';

    // Import grid settings
    let cellsNumber;
    let cellsPerRow;
    let bombs;
    switch (difficultySelect.value) {
        case '1':
            cellsNumber = 100;
            cellsPerRow = 10;
            bombs = 16;
            break;
        case '2':
            cellsNumber = 81;
            cellsPerRow = 9;
            bombs = 16;
            break;
        case '3':
            cellsNumber = 49;
            cellsPerRow = 7;
            bombs = 16;
    }

    // Init tracker arrays
    const bombList = bombGen(bombs, cellsNumber);
    const attemps = [];
    const maxAttemps = cellsNumber - bombs;

    // Create grid element
    const gridEl = document.createElement('div');
    gridEl.classList.add('grid');
    wrapGridEl.append(gridEl);

    // Create square elements
    for (let i = 1; i <= cellsNumber; i++) {
        // Call createSquareFunction
        const square = createSquareGrid(i, cellsPerRow);

        // Add event listener to each square
        square.addEventListener('click', () => clickSquareHandler(square, bombList, attemps, maxAttemps));

        // Add square to grid
        gridEl.append(square);
    }
});

// FUNCTIONS
// Handler click event square
function clickSquareHandler(square, bombList, attempsList, maxAttempts) {
    const squareNumber = parseInt(square.childNodes[0].innerHTML);

    if(!bombList.includes(squareNumber)) {
        square.classList.add('safe');
        attempsList.push(squareNumber);
        if (attempsList.length === maxAttempts) {
            endGame(bombList, attempsList, maxAttempts);
        }
    } else {
        endGame(bombList, attempsList, maxAttempts);
    }
}

// End game message
function endGame(bombList, attempsList, maxAttempts) {
    // Disable grid
    document.querySelector('.grid').classList.add('end-game');

    // Show all bombs
    const squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        if (bombList.includes(i + 1)) {
            squares[i].classList.add('bomb');
        }
    }

    // Create dom element for end game message
    const messageEl = document.createElement('div');
    messageEl.classList.add('text-center', 'fw-bold', 'fs-5', 'mb-5');

    // Set end game message
    let message;
    if (attempsList.length === maxAttempts) {
        message = `Hai vinto! Hai azzeccato tutte le ${maxAttempts} caselle salve!`
    } else {
        message = `Hai perso! Hai azzeccato ${attempsList.length} caselle su un totale di ${maxAttempts}. Gioca ancora...`
    }
    messageEl.append(message);
    wrapGridEl.append(messageEl); 
}

// Bomb generator
function bombGen(bombNumber, cellsNumber) {
    const bombList = [];
    while (bombList.length < bombNumber) {
        const bomb = randNumber(1, cellsNumber);
        if (!bombList.includes(bomb)) {
            bombList.push(bomb);
        }
    }
    return bombList;
}

// Create squares in grid
function createSquareGrid(num, cells) {
    const divNode = document.createElement('div');
    const spanSubNode = document.createElement('span');
    divNode.classList.add('square');
    divNode.style.width = `calc(100% / ${cells})`;
    divNode.style.height = `calc(100% / ${cells})`;
    spanSubNode.append(num);
    divNode.append(spanSubNode);
    return divNode;
}

// Gen random number
function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}