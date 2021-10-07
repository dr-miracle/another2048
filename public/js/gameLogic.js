//todo: сделать случайный выбор в spawn 2 или 4 (сейчас появляется только двойка)
class GameLogic {
    #min = 2;
    #max = 2048;
    #fieldSize = 4;
    #maxFieldSize = this.#fieldSize * this.#fieldSize;
    #gameField;
    #score = 0;
    #maxBlock = 2;
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
        return isEqual;
    }
    #getMatrix(arr, requiredTranspose){
        const field = [...arr];
        
        const matrix = [...Array(this.#fieldSize).keys()]
            .reduce((r, rowIndex) => {
                const start = rowIndex * this.#fieldSize;
                const end = start + this.#fieldSize;
                const row = field.slice(start, end);
                r.push(row);
                return r;
            }, []);
        return requiredTranspose ? this.#transpose(matrix) : matrix;
    }
    #calculate(direction){
        let score = 0;
        const requiredTranspose = direction === "up" || direction === "down";
        const leadingZeroes = direction === "right" || direction === "down";

        const matrix = this.#getMatrix(this.#gameField, requiredTranspose);
        const merged = matrix
            .map((row) => {
                const filtered = row
                    .filter((v) => v !== 0)
                    .map((v, i, rowArr) => {
                        const next = i + 1;
                        if (next > rowArr.length){
                            return v;
                        }
                        const nextV = rowArr[next];
                        if (nextV === v){
                            rowArr[next] = 0;
                            const doubled = v * 2;
                            score += doubled;
                            if (doubled > this.#maxBlock){
                                this.#maxBlock = doubled;
                            }
                            return doubled;
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
        //произошло слияние блоков или блоки переместились в другом направлении
        const hasDifference = !this.#isMatrixEquals(matrix, final);
        this.#gameField = concated;
        this.#score += score;
        return hasDifference;
    }
    constructor(field) {
        if (!field){
            this.reset();
        }else{
            this.#gameField = field
        }
    }
    reset(){
        this.#gameField = new Array(this.#maxFieldSize).fill(0);
        this.#score = 0;
        this.#maxBlock = 2;
    }
    max(){
        return this.#max;
    }
    currentMaxBlock(){
        return this.#maxBlock;
    }
    hasAnotherTurn(){
        let canMove = false;
        const directions = ["up", "right", "down", "left"];
        for(const direction of directions){
            const requiredTranspose = direction === "up" || direction === "down";
            if (canMove){
                break;
            }
            const matrix = this.#getMatrix(this.#gameField, requiredTranspose);
            for(const row of matrix){
                if (canMove){
                    break;
                }
                const filtered = row
                    .filter((v) => v !== 0);
                if (filtered.length  < 2){
                    continue;
                }
                for(let i = 0; i < filtered.length; i++){
                    const next = i + 1;
                    if (next > filtered.length){
                        break;
                    }
                    const v = filtered[i];
                    const nextV = filtered[next];
                    if (nextV === v){
                        canMove = true;
                        console.log(direction);
                        break;
                    }
                }
            }
        }
        return canMove;
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