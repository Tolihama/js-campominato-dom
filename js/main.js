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
    console.log(bombList);

    // Create grid element
    const gridEl = document.createElement('div');
    gridEl.classList.add('grid');
    wrapGridEl.append(gridEl);

    // Create square elements
    for (let i = 1; i <= cellsNumber; i++) {
        // Call createSquareFunction
        const square = createSquareGrid(i, cellsPerRow);

        // Add event listener to each square
        square.addEventListener('click', () => clickSquareHandler());

        // Add square to grid
        gridEl.append(square);
    }
});

// FUNCTIONS
// Handler click event square
function clickSquareHandler() {

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