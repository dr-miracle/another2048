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

function updateScore(s){
    score.innerText = s;
}