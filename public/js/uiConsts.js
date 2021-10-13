/* global GameLogic */

// eslint-disable-next-line no-unused-vars
const ids = {
  game: 'game-field',
  score: 'score',
  banner: {
    id: 'banner',
    text: 'banner-text',
    resetButton: 'banner-reset-button',
  },
  reset: 'reset-button',
};
// eslint-disable-next-line no-unused-vars
const keymap = new Map([
  ['ArrowUp', GameLogic.up],
  ['ArrowRight', GameLogic.right],
  ['ArrowDown', GameLogic.down],
  ['ArrowLeft', GameLogic.left],
]);

// eslint-disable-next-line no-unused-vars
const blockCss = 'game__block game__block__';
// eslint-disable-next-line no-unused-vars
const bannerCss = {
  base: 'banner',
  win: 'banner__winner',
  fail: 'banner__fail',
};
