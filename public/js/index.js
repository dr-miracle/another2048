const testInstance = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
const game = document.getElementById(ids.game);
const score = document.getElementById(ids.score);
const banner = document.getElementById(ids.banner.id);
const bannerText = document.getElementById(ids.banner.text);

const gameLogic = new GameLogic(testInstance);
populateGrid(testInstance);

this.onkeyup = onKeyup;
document.getElementById(ids.banner.resetButton).addEventListener('click', onReset);
document.getElementById(ids.reset).addEventListener('click', onReset);
this.onload = onWindowLoad;