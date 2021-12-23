// Global Params
const minX = 4;
const maxX = 20;
const minY = 4;
const maxY = 20;

// Vue App
const app = new Vue({
    el: '#app',
    data: {
        x: 4,
        y: 4,
        bombs: 1,
    },
    computed: {
        xCells() {
            if (this.x < 4) {
                return 4;
            } else if (this.x > 20) {
                return 20;
            } else {
                return parseInt(this.x);
            }
        },
        yColumns() {
            if (this.y < 4) {
                return 4;
            } else if (this.y > 20) {
                return 20;
            } else {
                return parseInt(this.y);
            }
        },
        gridCells() {
            return this.xCells * this.yColumns;
        },
        maxBombs() {
            return Math.floor(this.gridCells / 2);
        }
    },
    methods: {
        whoAreYou(x, y) {
            console.log('Square clicked', `x:${x} y:${y} id:${x + y * this.xCells}`);
        },
        rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
});