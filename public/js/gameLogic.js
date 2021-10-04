class GameLogic {
    #min = 2;
    #max = 2048;
    #fieldSize = 4;
    #maxFieldSize = this.#fieldSize * this.#fieldSize;
    #gameField;
    #score = 0;
    #getEmptyIndexes(){
        return this.#gameField.reduce((res, v, i) => {
            if (v === 0){
                res.push(i)
            }
            return res;
        }, [])
    }
    #getPathIndex(index, direction){
        let border, offsetRow, offsetColumn;
        const row = Math.floor(index / this.#fieldSize) + 1;
        const column = index % this.#fieldSize;
        let reverse = false;
        switch(direction){
            case "up":
                border = 0;
                offsetRow = -4;
                offsetColumn = 0;
                reverse = true;
                break;
            case "right":
                border = row * this.#fieldSize - 1;
                offsetRow = 0;
                offsetColumn = 1;
                break;
            case "down":
                border = this.#maxFieldSize - 1;
                offsetRow = 4;
                offsetColumn = 0;
                break;
            case "left":
                border = (row - 1) * this.#fieldSize;
                offsetRow = 0;
                offsetColumn = -1;
                reverse = true;
                break;
        }
        // console.log('getPathIndex', 'i:', index, 'b', border, 'r', row, 'c', column);
        let end = index;
        while(true){
            const next = end + offsetRow + offsetColumn;
            // console.log('next', next);
            if (reverse && next < border){
                break;
            }else if (!reverse && next > border){
                break;
            }
            end = next;
            const nextV = this.#gameField[next];
            if (nextV !== 0){
                break;
            }
        }
        // console.log('end', end);
        return end;
    }
    #calculate(direction){
        let score = 0;
        this.#gameField
        .forEach((currentValue, startIndex) => {
            //пустые клетки нас не интересует
            if (currentValue === 0){
                return;
            }
            
            const endIndex = this.#getPathIndex(startIndex, direction);
            //движение блока дальше невозможно - перед ним другой не пустой блок
            if (startIndex === endIndex){
                return;
            }
            const endValue = this.#gameField[endIndex];
            this.#gameField[startIndex] = 0;
            if (endValue === 0){
                this.#gameField[endIndex] = currentValue;
            }else if (endValue === currentValue){
                this.#gameField[endIndex] = currentValue * 2;
                score += currentValue * 2;
            }
        });
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
        const randomIndex = Math.round(Math.random() * emptyBlocksIndexes.length);
        const emptyIndex = emptyBlocksIndexes[randomIndex];
        this.#gameField[emptyIndex] = this.#min;
    }
}