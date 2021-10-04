class ViewIteraction{
    constructor(){

    }
}

const testInstance = [
    0, 0, 0, 2,
    2, 0, 0, 0,
    0, 0, 2, 0,
    0, 0, 2, 0
];
const logicInstance = new GameLogic(testInstance);
console.log(logicInstance);
console.log(logicInstance.gameField());
console.log(logicInstance.down());
console.log(logicInstance.gameField());
console.log(logicInstance.score());
