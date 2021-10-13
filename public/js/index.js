/* global document */
/* global GameLogic */
/* global populateGrid */
/* global ids */
/* global onReset */
/* global onKeyup */
/* global onWindowLoad */
const testInstance = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
];
// eslint-disable-next-line no-unused-vars
const game = document.getElementById(ids.game);
// eslint-disable-next-line no-unused-vars
const score = document.getElementById(ids.score);
// eslint-disable-next-line no-unused-vars
const banner = document.getElementById(ids.banner.id);
// eslint-disable-next-line no-unused-vars
const bannerText = document.getElementById(ids.banner.text);

// eslint-disable-next-line no-unused-vars
const gameLogic = new GameLogic(testInstance);
populateGrid(testInstance);

this.onkeyup = onKeyup;
document.getElementById(ids.banner.resetButton).addEventListener('click', onReset);
document.getElementById(ids.reset).addEventListener('click', onReset);
this.onload = onWindowLoad;
