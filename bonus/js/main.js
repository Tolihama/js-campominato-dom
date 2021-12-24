// Vue App
const app = new Vue({
    el: '#app',
    data: {
        // Params 
        minX: 7,
        maxX: 20,

        minY: 7,
        maxY: 20,

        minBombs: 4,

        // Input
        xInput: 7,
        yInput: 7,
        bombsInput: 4,

        // Script utilities
        bombsArray: [],
        clickedSquares: [],
        gameStarted: false,
    },
    computed: {
        maxBombs() {
            return Math.floor(this.gridCells / 2);
        },

        // Input checks
        xColumns() {
            if (this.xInput < this.minX) {
                return this.minX;
            } else if (this.xInput > this.maxX) {
                return this.maxX;
            } else {
                return this.xInput;
            }
        },
        yRows() {
            if (this.yInput < this.minY) {
                return this.minY;
            } else if (this.yInput > this.maxY) {
                return this.maxY;
            } else {
                return this.yInput;
            }
        },
        bombs() {
            if (this.bombsInput < this.minBombs) {
                return this.minBombs;
            } else if (this.bombsInput > this.maxBombs) {
                return this.maxBombs;
            } else {
                return this.bombsInput;
            }
        },

        // Grid dimension
        gridCells() {
            return this.xColumns * this.yRows;
        },
        safeCellsRemaining() {
            return this.gridCells - this.bombs - this.clickedSquares.length;
        },

    },
    methods: {
        playGame(x, y) {
            const clickedSquareId = this.squareId(x, y);
            // console.log('Square clicked', `x:${x} y:${y} id:${clickedSquareId}`);

            // Initial click (start game)
            if (!this.gameStarted) {
                // console.log('Faccio partire il gioco');
                this.gameStarted = true;

                // Bomb generation
                let i = 0;
                while (i < this.bombs) {
                    const newRand = this.rand(0, this.gridCells - 1);
                    if (!this.bombsArray.includes(newRand) && !this.bombsArray.includes(clickedSquareId)) {
                        this.bombsArray.push(newRand);
                        i++;
                    }
                }
            }

            // Bomb check
            const squareDomRef = document.querySelector(`#square-${clickedSquareId}`);
            if (this.bombsArray.includes(clickedSquareId)) {

                squareDomRef.classList.add('bomb');
                this.gameStarted = false;

                // TODO: events in bad end case

            } else {

                this.bombsAround(x, y);
                
            }
        },

        bombsAround(x, y) {
            this.clickedSquares.push(this.squareId(x, y));

            const domRef = document.querySelector(`#square-${this.squareId(x, y)}`);
            let bombsAround = 0;

            // Bombs around count
            this.squaresAround(x, y).forEach(squareToCheck => {
                if (this.bombsArray.includes(squareToCheck.id)) {
                    bombsAround++;
                }
            });

            // Count print
            domRef.innerHTML = bombsAround;
            domRef.classList.add('safe');
            domRef.classList.add(`safe-${bombsAround}`);

            if (bombsAround === 0) {
                this.squaresAround(x, y).forEach(squareAround => {
                    if (!this.clickedSquares.includes(squareAround.id) && !this.bombsArray.includes(squareAround.id)) {
                        // WARN: ricorsivity
                        this.bombsAround(squareAround.x, squareAround.y);
                    }
                })
            }
        },

        squaresAround(x, y) {
            const squaresAround = [];

            this.squaresAroundRelativePositions(x, y).forEach(squareAround => {
                if (squareAround.x >= 0 && squareAround.y >= 0 && squareAround.x < this.xColumns && squareAround.y < this.yRows) {
                    squaresAround.push({
                        x: squareAround.x,
                        y: squareAround.y,
                        id: this.squareId(squareAround.x, squareAround.y),
                    });
                }
            });
            
            return squaresAround;
        },

        squareId(x, y) {
            return x + y * this.xColumns;
        },

        squaresAroundRelativePositions(squareX, squareY) {
            return [
                {
                    x: squareX - 1,
                    y: squareY - 1,
                },
                {
                    x: squareX,
                    y: squareY - 1,
                },
                {
                    x: squareX + 1,
                    y: squareY - 1,
                },
                {
                    x: squareX - 1,
                    y: squareY,
                },
                {
                    x: squareX + 1,
                    y: squareY,
                },
                {
                    x: squareX - 1,
                    y: squareY + 1,
                },
                {
                    x: squareX,
                    y: squareY + 1,
                },
                {
                    x: squareX + 1,
                    y: squareY + 1,
                }
            ];
        },

        rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
});