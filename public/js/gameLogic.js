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
                    .map((v, i, rowArr) => {
                        if (v === 0){
                            return v;
                        }
                        const next = i + 1;
                        if (next > rowArr.length - 1){
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
        // const merged = conjArr.map((row) => {
        //     for(let i = 0; i < row.length - 1; i++){
        //         const v = row[i];
        //         if (v === 0){
        //             continue;
        //         }
        //         const next = i + 1;
        //         const nextV = row[next];
        //         if (!nextV){
        //             break;
        //         }
        //         if (nextV === v){
        //             row[i] = v * 2;
        //             row[next] = 0;
        //             score += v * 2;
        //         }
        //     }
        //     const filtered = row.filter((v) => v !== 0);
        //     const zeroes = Array(this.#fieldSize - filtered.length).fill(0);
        //     return leadingZeroes ? [...zeroes, ...filtered] : [...filtered, ...zeroes];
        // });
        console.log(merged);
        const final = (requiredTranspose ? this.#transpose(merged) : merged)
            .reduce((arr, v) => {
                return arr.concat(v);
            }, []);
        this.#gameField = final;
    }
    // //используй связный список, дурень
    // #merge(row, reverse){
    //     let start = reverse ? row.length - 1 : 0;
    //     let offset = reverse ? -1 : 1;
    //     let border = reverse ? -1 : row.length;
    //     console.log('start', start, 'offset', offset, 'border', border);
    //     let end = start;
    //     while(true){
    //         const next = start + 1;
    //         if (next === border){
    //             break;
    //         }
    //         const v = row[end];
    //         const nextV = row[next];
    //         if (v === 0){

    //         }
    //     }
    // }
    // #getPathIndex(index, direction){
    //     let border, offsetRow, offsetColumn;
    //     const row = Math.floor(index / this.#fieldSize) + 1;
    //     const column = index % this.#fieldSize;
    //     let reverse = false;
    //     let end = index;
    //     switch(direction){
    //         case "up":
    //             border = 0;
    //             offsetRow = -4;
    //             offsetColumn = 0;
    //             reverse = true;
    //             break;
    //         case "right":
    //             border = row * this.#fieldSize - 1;
    //             offsetRow = 0;
    //             offsetColumn = -1;
    //             end = border;
    //             break;
    //         case "down":
    //             border = this.#maxFieldSize - 1;
    //             offsetRow = 4;
    //             offsetColumn = 0;
    //             break;
    //         case "left":
    //             border = (row - 1) * this.#fieldSize;
    //             offsetRow = 0;
    //             offsetColumn = -1;
    //             reverse = true;
    //             break;
    //     }
    //     console.log('getPathIndex', 'i:', index, 'b', border, 'r', row, 'c', column);
    //     while(true){
    //         const currentV = this.#gameField[end];
    //         const next = end + offsetRow + offsetColumn;
    //         console.log('next', next);
    //         if (reverse && next < border){
    //             break;
    //         }else if (!reverse && next > border){
    //             break;
    //         }
    //         const nextV = this.#gameField[next];
    //         if (currentV === nextV || nextV === 0){
    //             end = next;
    //         }else{
    //             break;
    //         }
    //     }
    //     // console.log('end', end);
    //     return end;
    // }
    // #calculate(direction){
    //     let score = 0;
    //     this.#gameField
    //     .forEach((currentValue, startIndex) => {
    //         //пустые клетки нас не интересует
    //         if (currentValue === 0){
    //             return;
    //         }
            
    //         const endIndex = this.#getPathIndex(startIndex, direction);
    //         console.log(startIndex, endIndex);
    //         //движение блока дальше невозможно - перед ним другой не пустой блок
    //         if (startIndex === endIndex){
    //             return;
    //         }
    //         const endValue = this.#gameField[endIndex];
    //         this.#gameField[startIndex] = 0;
    //         if (endValue === 0){
    //             this.#gameField[endIndex] = currentValue;
    //         }else if (endValue === currentValue){
    //             this.#gameField[endIndex] = currentValue * 2;
    //             score += currentValue * 2;
    //         }
    //     });
    //     this.#score += score;
    // }
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