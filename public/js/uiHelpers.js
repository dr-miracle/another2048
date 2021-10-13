/* global game */
/* global blockCss */
/* global bannerCss */
/* global document */
/* global gameLogic */
/* global bannerText */
/* global banner */
/* global score */

function updateGrid(field) {
  const childrens = Array.from(game.children);
  Object.keys(childrens)
    .forEach((childrenIndex) => {
      const v = field[childrenIndex];
      const block = childrens[childrenIndex];
      const blockV = +block.innerHTML;
      if (v === blockV) {
        return;
      }
      block.innerHTML = v;
      block.className = blockCss + v;
    });
}
// eslint-disable-next-line no-unused-vars
function populateGrid(field) {
  game.innerHTML = '';
  field.forEach((v) => {
    const div = document.createElement('div');
    div.innerHTML = v;
    div.className = blockCss + v;
    game.append(div);
  });
}

function printGameField() {
  // eslint-disable-next-line no-console
  console.log('\n');
  const gameField = [...gameLogic.gameField()];
  const rowArr = [];
  for (let row = 0, column = 0; row < 4;) {
    const v = gameField[row * 4 + column];
    rowArr.push(v);
    // eslint-disable-next-line no-plusplus
    column++;
    if (column === 4) {
      // eslint-disable-next-line no-plusplus
      row++;
      column = 0;
      rowArr.length = 0;
    }
  }
}

function displayBanner(show, win) {
  let css = bannerCss.base;
  if (show) {
    css += ` ${win ? bannerCss.win : bannerCss.fail}`;
    const text = `Your best score: ${gameLogic.score()}`;
    bannerText.innerHTML = text;
  }
  banner.className = css;
}

// eslint-disable-next-line no-unused-vars
function updateView() {
  const currentScore = gameLogic.score();
  const currentField = gameLogic.gameField();
  const currentMaxBlock = gameLogic.currentMaxBlock();
  printGameField();
  updateGrid(currentField);
  updateScore(currentScore);
  if (currentMaxBlock >= gameLogic.max()) {
    displayBanner(true, true);
  }
}

function updateScore(s) {
  score.innerText = s;
}
