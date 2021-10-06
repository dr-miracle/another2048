const ids = {
    game: "game-field",
    score: "score",
    failBanner: "fail-banner",
    winBanner: "win-banner"
}

const testInstance = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
// const testInstance = [
//     0, 4, 4, 0,
//     2, 0, 0, 2,
//     4, 0, 0, 2,
//     4, 4, 2, 2
// ];
//todo: проверить 2 0 0 2

//4, 4, 2, 2
//expect 0 0 8 4 in last row
const gameLogic = new GameLogic(testInstance);
const keymap = new Map([
    ['ArrowUp', GameLogic.up],
    ['ArrowRight', GameLogic.right],
    ['ArrowDown', GameLogic.down],
    ['ArrowLeft', GameLogic.left],
]);

const blockCss = "game__block game__block__";
const game = document.getElementById(ids.game);
const score = document.getElementById(ids.score);

function onKeyup(e){
    const { key } = e;
    console.log(key);
    const gameEvent = keymap.get(key);
    console.log(gameEvent);
    if (!gameEvent){
        return;
    }
    const needSpawn = gameEvent.call(gameLogic);
    console.log('needSpawn', needSpawn);
    if (!needSpawn){
        return;
    }
    const spawned = gameLogic.spawn();
    if (spawned){
        return updateView();
    }
    // const hasAnotherTurn = gameLogic.hasAnotherTurn();
    // if (hasAnotherTurn){
    //     return;
    // }
    // showFailBanner();
}

function failBanner(show){

}

function winBanner(show){

}

function updateView(){
    const currentScore = gameLogic.score();
    const currentField = gameLogic.gameField();
    printGameField();
    updateGrid(currentField);
    updateScore(currentScore);
}

function updateGrid(field){
    const childrens = Array.from(game.children);
    Object.keys(childrens)
        .forEach((childrenIndex) => {
            const v = field[childrenIndex];
            const block = childrens[childrenIndex];
            const blockV = +block.innerHTML;
            if (v === blockV){
                return;
            }
            block.innerHTML = v;
            block.className = blockCss + v;
        })
}
function populateGrid(field){
    game.innerHTML = '';
    field.forEach((v) => {
        let div = document.createElement('div');
        div.innerHTML = v;
        div.className = blockCss + v;
        game.append(div);
    })
}

function printGameField(){
    console.log('\n');
    const gameField = [...gameLogic.gameField()];
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

function updateScore(s){
    score.innerText = s;
}

this.onkeyup = onKeyup;

window.onload = (e) => {
    gameLogic.spawn();
    gameLogic.spawn();
    printGameField();
    const currentField = gameLogic.gameField()
    populateGrid(currentField);
}
