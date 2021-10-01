class GameLogic {
    #min = 2;
    #max = 2048;
    #fieldSize = 4;
    #maxFieldSize = this.#fieldSize * this.#fieldSize;
    #gameField = new Array(16).fill(0);
    #score = 0;
    #getEmptyIndexes(){
        return this.#gameField.reduce((res, v, i) => {
            if (v === 0){
                res.push(i)
            }
            return res;
        }, [])
    }
    #getNonEmptyIndexes(){
        return this.#gameField.reduce((res, v, i) => {
            if (v !== 0){
                res.push(i)
            }
            return res;
        }, [])
    }
    #getPathIndex(index, direction){
        //offset и border будет зависеть от direction
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
                border = row * 4 - 1;
                offsetRow = 0;
                offsetColumn = 1;
                break;
            case "down":
                border = this.#maxFieldSize - 1;
                offsetRow = 4;
                offsetColumn = 0;
                break;
            case "left":
                border = (row - 1) * 4;
                offsetRow = 0;
                offsetColumn = -1;
                reverse = true;
                break;
        }
        
        // if (direction === 0){
        //     border = this.#maxFieldSize - 1;
        //     offsetRow = -4;
        //     offsetColumn = 0;
        //     reverse = true;
        // }else if (direction === 1){
        //     border = row * 4 - 1;
        //     offsetRow = 0;
        //     offsetColumn = 1;
        // }
        // else if(direction === 2){
        //     border = this.#maxFieldSize - 1;
        //     offsetRow = 4;
        //     offsetColumn = 0;
        // }else if(direction === 3){
        //     border = (row - 1) * 4;
        //     offsetRow = 0;
        //     offsetColumn = -1;
        // }
        console.log('getPathIndex', 'i:', index, 'b', border, 'r', row, 'c', column);
        let end = index;
        while(true){
            const next = end + offsetRow + offsetColumn;
            console.log('next', next);
            if (reverse && next < border){
                break;
            }else if (!reverse && next > border){
                break;
            }
            // if (next < 0 || next > border){
            //     break;
            // }
            end = next;
            const nextV = this.#gameField[next];
            if (nextV !== 0){
                break;
            }
        }


        // while(end > border){
        //     const next = end + offset;
        //     console.log('n', next, 'e', end);
        //     if (next > border){
        //         break;
        //     }
        //     const nextV = this.#gameField[next];
        //     end = next;
        //     if (nextV !== 0){
        //         break;
        //     }
        //     ///иначе пустая клетка и продолжаем двигаться дальше пока не дойдем до границы
        // }
        console.log('end', end);
        return end;
        // let currentIndex = index;
        // let indexes = [];
        // const offset = 4;
        // const borderIndex = this.#maxFieldSize - this.#fieldSize;
        // while(currentIndex < borderIndex){
        //     currentIndex += offset;
        //     indexes.push(currentIndex);
        // }
        // return indexes;
    }
    #calculate(direction){
        let score = 0;
        this.#gameField
        .forEach((startV, startIndex) => {
            if (startV === 0){
                return;
            }
            
            const endIndex = this.#getPathIndex(startIndex, direction);
            if (startIndex === endIndex){
                return;
            }
            const endV = this.#gameField[endIndex];
            this.#gameField[startIndex] = 0;

            if (endV === 0){
                this.#gameField[endIndex] = startV;
            }else if (endV === startV){
                this.#gameField[endIndex] = startV * 2;
                score += startV * 2;
            }
        })
        // const nonEmptyIndexes = this.#getNonEmptyIndexes();
        // console.log(nonEmptyIndexes);
        // const score = nonEmptyIndexes
        //     .map((startIndex) => {
        //         const endIndex = this.#getPathIndex(startIndex, direction);
        //         return { startIndex, endIndex };
        //     })
        //     .reduce((score, v) => {
        //         console.log('v', v);
        //         const { startIndex, endIndex } = v;
        //         const startV = this.#gameField[startIndex];
        //         const endV = this.#gameField[endIndex];
        //         if (startIndex === endIndex){
        //             return score;
        //         }
        //         if (endV === 0){
        //             this.#gameField[startIndex] = 0;
        //             this.#gameField[endIndex] = startV;
        //         }else if (startV === endV){
        //             this.#gameField[startIndex] = 0;
        //             this.#gameField[endIndex] = startV * 2;
        //             score += startV * 2;
        //         }else{
        //             //ничего не делать
        //         }
        //         return score;
        //     }, 0);
        console.log(this.#gameField);
        console.log('score', score);
            // .forEach((block) => {
            //     const { index, paths } = block;
            //     const blockValue = this.#gameField[index];
            //     console.log(block);
            //     // paths.forEach((pathIndex) => {
            //     //     const pathValue = this.#gameField[pathIndex];
            //     //     if (pathValue === blockValue){
            //     //         this.#gameField[pathIndex] = blockValue + blockValue;
            //     //     }else if (pathValue === 0){
            //     //         this.#gameField[pathIndex] = blockValue;
            //     //     }else{

            //     //     }
            //     //     this.#gameField[index] = 0;
            //     // })
            // })
        // const paths = nonEmptyIndexes.map((v) => {
        //     const paths = this.#getPathIndexes(v, 2);
        //     return { v, paths };
        // }).forEach((nonEmptyBlock) => {
        //     const { v, paths } = nonEmptyBlock;
        //     paths.forEach((pathIndex) => {
        //         const pathV = this.#gameField[pathIndex];
        //         if (pathV === v){
        //             this
        //         }
        //     })
        // })
        // console.log(paths);
    
    }
    constructor() {
        this.#gameField[3] = 2;
        this.#gameField[4] = 2;
        this.#gameField[10] = 2;
        this.#gameField[14] = 2;
        // this.spawn();
        // this.spawn();
        // this.up();
        // this.right();
        // this.down();
        this.left();
    }
    score(){
        return this.score;
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
class ViewIteraction{
    constructor(){

    }
}


const logicInstance = new GameLogic();

console.log(logicInstance);
console.log(this.init);