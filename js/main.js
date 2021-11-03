// DOM Refs
const playBtn = document.querySelector('#play-btn');
const difficultySelect = document.querySelector('#difficulty');
const wrapGridEl = document.querySelector('.wrap-grid');

// Gen Grid
playBtn.addEventListener('click', () => {
    // Import grid settings
    let cellsNumber;
    let cellsPerRow;
    switch (difficultySelect.value) {
        case '1':
            cellsNumber = 100;
            cellsPerRow = 10;
            break;
        case '2':
            cellsNumber = 81;
            cellsPerRow = 9;
            break;
        case '3':
            cellsNumber = 49;
            cellsPerRow = 7;
    }

    // Clear grid
    wrapGridEl.innerHTML = '';

    // Create grid element
    const gridEl = document.createElement('div');
    gridEl.classList.add('grid');
    wrapGridEl.append(gridEl);

    // Create square elements
    for (let i = 1; i <= cellsNumber; i++) {
        // Call createSquareFunction
        const square = createSquareGrid(i, cellsPerRow);

        // Add event listener to each square
        square.addEventListener('click', () => square.classList.add('clicked'));

        // Add square to grid
        gridEl.append(square);
    }
});

// FUNCTIONS
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