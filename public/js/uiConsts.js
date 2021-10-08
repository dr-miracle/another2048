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