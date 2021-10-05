function onKeyup(e){
    const { key } = e;
    console.log(key);
    const gameEvent = keymap.get(key);
    if (!gameEvent){
        return;
    }
    gameEvent.call(logicInstance);
    logicInstance.spawn();
    printGameField();
    console.log(logicInstance.score());
}
function printGameField(){
    console.log('\n');
    const gameField = [...logicInstance.gameField()];
    let rowArr = [];
    for(let row = 0, column = 0; row < 4;){
        const v = gameField[row * 4 + column];
        rowArr.push(v);
        column++;
        if (column === 4){
            row++;
            column = 0;
            console.log(rowArr);
            rowArr.length = 0;
        }
    }
}
const testInstance = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    4, 4, 2, 2
];
//expect 0 0 8 4 in last row
const logicInstance = new GameLogic(testInstance);
// logicInstance.spawn();
// logicInstance.spawn();
console.log(logicInstance);
printGameField();

this.onkeyup = onKeyup;
const keymap = new Map([
    ['ArrowUp', logicInstance.up],
    ['ArrowRight', logicInstance.right],
    ['ArrowDown', logicInstance.down],
    ['ArrowLeft', logicInstance.left],
]);
