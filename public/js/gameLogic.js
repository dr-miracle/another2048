class GameLogic {
    #min = 2;
    #max = 2048;
    #fieldSize = 4;
    #maxFieldSize = this.#fieldSize * this.#fieldSize;
    #gameField;
    #score = 0;
    #transpose(array){
        return Object.keys(array[0])
                .map(colNumber => array.map(rowNumber => rowNumber[colNumber]));
    }
    #getEmptyIndexes(){
        return this.#gameField.reduce((res, v, i) => {
            if (v === 0){
                res.push(i)
            }
            return res;
        }, [])
    }
    #calculate(direction){
        let score = 0;
        const leadingZeroes = direction === "right" || direction === "down";
        const requiredTranspose = direction === "up" || direction === "down";
        const field = [...this.#gameField];
        
        const matrix = [...Array(this.#fieldSize).keys()]
            .reduce((r, rowIndex) => {
                const start = rowIndex * this.#fieldSize;
                const end = start + this.#fieldSize;
                const row = field.slice(start, end);
                r.push(row);
                return r;
            }, []) ;
        const conjArr = requiredTranspose ? this.#transpose(matrix) : matrix;
        const merged = conjArr
            .map((row) => {
                const filtered = row
                    .filter((v) => v !== 0)
                    .map((v, i, rowArr) => {
                        if (v === 0){
                            return v;
                        }
                        const next = i + 1;
                        if (next > rowArr.length){
                            return v;
                        }
                        const nextV = rowArr[next];
                        if (nextV === v){
                            rowArr[next] = 0;
                            score += v * 2;
                            return v * 2;
                        }else{
                            return v;
                        }
                    })
                    .filter((v) => v !== 0);
                const zeroes = Array(this.#fieldSize - filtered.length).fill(0);
                return leadingZeroes ? [...zeroes, ...filtered] : [...filtered, ...zeroes];
            });
        const final = (requiredTranspose ? this.#transpose(merged) : merged)
            .reduce((arr, v) => {
                return arr.concat(v);
            }, []);
        this.#gameField = final;
        this.#score += score;
    }
    constructor(field) {
        this.#gameField = field ? field : new Array(this.#maxFieldSize).fill(0);
    }
    score(){
        return this.#score;
    }
    gameField(){
        return this.#gameField;
    }
    up(){
        this.#calculate('up');
    }
    right(){
        this.#calculate('right');
    }
    down(){
        this.#calculate('down');
    }
    left(){
        this.#calculate('left');
    }
    spawn(){
        const emptyBlocksIndexes = this.#getEmptyIndexes();
        const randomIndex = Math.floor(Math.random() * emptyBlocksIndexes.length);
        const emptyIndex = emptyBlocksIndexes[randomIndex];
        console.log('spawned at', emptyIndex, emptyBlocksIndexes, randomIndex);
        this.#gameField[emptyIndex] = this.#min;
    }
}