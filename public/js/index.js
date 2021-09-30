class GameLogic {
    #min = 2;
    #max = 2048;
    #fieldSize = 4;
    #maxFieldSize = this.#fieldSize * this.#fieldSize;
    #gameField = new Array(16).fill(0);
    #direction;
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
        let border, offset; 
        if (direction === 0){
            offset = -4;
        }else if(direction === 2){
            border = this.#maxFieldSize - 1;
            offset = 4;
        }
        console.log('getPathIndex', direction, border, offset);
        let end = index;
        while(end < border){
            const next = end + offset;
            if (next > border){
                break;
            }
            const nextV = this.#gameField[next];
            end = next;
            if (nextV !== 0){
                break;
            }
            ///иначе пустая клетка и продолжаем двигаться дальше пока не дойдем до границы
        }
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
        const nonEmptyIndexes = this.#getNonEmptyIndexes();
        console.log(nonEmptyIndexes);
        const score = nonEmptyIndexes
            .map((startIndex) => {
                const endIndex = this.#getPathIndex(startIndex, direction);
                console.log(endIndex);
                return { startIndex, endIndex };
            })
            .reduce((score, v) => {
                console.log('v', v);
                const { startIndex, endIndex } = v;
                const startV = this.#gameField[startIndex];
                const endV = this.#gameField[endIndex];
                if (startIndex === endIndex){
                    return score;
                }
                if (endV === 0){
                    this.#gameField[startIndex] = 0;
                    this.#gameField[endIndex] = startV;
                }else if (startV === endV){
                    this.#gameField[startIndex] = 0;
                    this.#gameField[endIndex] = startV * 2;
                    score += startV * 2;
                }else{
                    //ничего не делать
                }
                return score;
            }, 0);
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
        this.#direction = -1;
        this.#gameField[3] = 2;
        this.#gameField[4] = 2;
        this.#gameField[10] = 2;
        this.#gameField[14] = 2;
        // this.spawn();
        // this.spawn();
        this.down();
    }
    score(){
        return this.score;
    }
    up(){
        this.#direction = 0;
    }
    right(){
        this.#direction = 1;
    }
    down(){
        this.#direction = 2;
        this.#calculate(2);
    }
    left(){
        this.#direction = 3;
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