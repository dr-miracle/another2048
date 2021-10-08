const ids = {
    game: "game-field",
    score: "score",
    banner: {
        id: "banner",
        text: "banner-text",
        resetButton: "banner-reset-button"
    },
    reset: "reset-button"
}

const testInstance = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
// const testInstance = [
//     2, 4, 16, 8,
//     4, 8, 128, 4,
//     8, 64, 2, 256,
//     4, 8, 16, 32
// ];
// const testInstance = [
//     0, 4, 4, 0,
//     2, 0, 0, 2,
//     4, 0, 0, 2,
//     4, 4, 2, 2
// ];
// const testInstance = [
//     4, 4, 4, 2,
//     16, 2, 16, 8,
//     8, 32, 128, 16,
//     2, 4, 16, 4
// ];
// const testInstance = [
//     1024, 1024, 4, 2,
//     16, 2, 16, 8,
//     8, 32, 128, 16,
//     2, 4, 16, 4
// ];
//todo: проверить 2 0 0 2

//4, 4, 2, 2
//expect 0 0 8 4 in last row
const keymap = new Map([
    ['ArrowUp', GameLogic.up],
    ['ArrowRight', GameLogic.right],
    ['ArrowDown', GameLogic.down],
    ['ArrowLeft', GameLogic.left],
]);

const blockCss = "game__block game__block__";
const bannerCss = {
    base: "banner",
    win: "banner__winner",
    fail: "banner__fail"
}
const game = document.getElementById(ids.game);
const score = document.getElementById(ids.score);
const banner = document.getElementById(ids.banner.id);
const bannerText = document.getElementById(ids.banner.text);
const bannerResetButton = document.getElementById(ids.banner.resetButton);
const resetButton = document.getElementById(ids.reset);

const gameLogic = new GameLogic(testInstance);
populateGrid(testInstance);

function onKeyup(e){
    const { key } = e;
    console.log(key);
    const gameEvent = keymap.get(key);
    if (!gameEvent){
        return;
    }
    const hasDifference = gameEvent.call(gameLogic);
    console.log('hasDifference', hasDifference);
    if (!hasDifference){
        return;
    }
    const spawned = gameLogic.spawn();
    if (spawned){
        return updateView();
    }
    const hasAnotherTurn = gameLogic.hasAnotherTurn();
    console.log(hasAnotherTurn);
    if (hasAnotherTurn){
        return;
    }
    displayBanner(show = true, win = false);
}

function onWindowLoad(e){
    gameLogic.spawn();
    gameLogic.spawn();
    updateView();
}

function displayBanner(show, win){
    let css = bannerCss.base;
    if (show){
        css += " " + (win ? bannerCss.win : bannerCss.fail);
        const text = "Your best score: " + gameLogic.score();
        bannerText.innerHTML = text;
        // return banner.style.visibility = 'hidden';
    }
    banner.className = css;
}

function updateView(){
    const currentScore = gameLogic.score();
    const currentField = gameLogic.gameField();
    const currentMaxBlock = gameLogic.currentMaxBlock();
    printGameField();
    updateGrid(currentField);
    updateScore(currentScore);
    if (currentMaxBlock >= gameLogic.max()){
        displayBanner(show = true, win = true);
    }
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

function reset(){
    gameLogic.reset();
    displayBanner(show = false);
    onWindowLoad();
}

this.onkeyup = onKeyup;
this.onload = onWindowLoad;
bannerResetButton.addEventListener('click', reset);
resetButton.addEventListener('click', reset);
