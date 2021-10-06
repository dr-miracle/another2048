//todo: сделать случайный выбор в spawn 2 или 4 (сейчас появляется только двойка)
class GameLogic {
    #min = 2;
    #max = 2048;
    #fieldSize = 4;
    #maxFieldSize = this.#fieldSize * this.#fieldSize;
    #gameField;
    #score = 0;
    #transpose(array){
        const [ cols ] = array;
        return Object.keys(cols)
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
    #isMatrixEquals(oldArr, newArr){
        const [ row ] = oldArr;
        const isEqual = Object.keys(row)
            .every((rowIndex) => {
                const oldRow = oldArr[rowIndex];
                const newRow = newArr[rowIndex];
                return oldRow.every((v, i) => v === newRow[i]);
            })
        console.log(isEqual);
        return isEqual;
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
        const final = (requiredTranspose ? this.#transpose(merged) : merged);
        const concated = final
            .reduce((arr, v) => {
                return arr.concat(v);
            }, []);
        const needSpawn = this.#isMatrixEquals(matrix, final);
        this.#gameField = concated;
        this.#score += score;
        return !needSpawn;
    }
    constructor(field) {
        this.#gameField = field ? field : new Array(this.#maxFieldSize).fill(0);
    }
    hasAnotherTurn(){
        //заготовка
        return true;
    }
    score(){
        return this.#score;
    }
    gameField(){
        return this.#gameField;
    }
    static up(){
        return this.#calculate('up');
    }
    static right(){
        return this.#calculate('right');
    }
    static down(){
        return this.#calculate('down');
    }
    static left(){
        return this.#calculate('left');
    }
    spawn(){
        const emptyBlocksIndexes = this.#getEmptyIndexes();
        const canSpawn = emptyBlocksIndexes.length !== 0;
        if (!canSpawn){
            return false;
        }
        const randomIndex = Math.floor(Math.random() * emptyBlocksIndexes.length);
        const emptyIndex = emptyBlocksIndexes[randomIndex];
        const value = (Math.floor(Math.random() * 100)) > 5 ? this.#min : (this.#min * 2);
        this.#gameField[emptyIndex] = value;
        return true;
    }
}