/* global keymap */
/* global gameLogic */
/* global updateView */
/* global displayBanner */

// eslint-disable-next-line no-unused-vars
function onKeyup(e) {
  const { key } = e;
  // console.log(key);
  const gameEvent = keymap.get(key);
  if (!gameEvent) {
    return;
  }
  const hasDifference = gameEvent.call(gameLogic);
  // console.log('hasDifference', hasDifference);
  if (!hasDifference) {
    const hasAnotherTurn = gameLogic.hasAnotherTurn();
    // console.log(hasAnotherTurn);
    if (!hasAnotherTurn) {
      displayBanner(true, false);
      return;
    }
    return;
  }
  const spawned = gameLogic.spawn();
  // console.log('block spawned', spawned);
  if (spawned) {
    updateView();
  }
}

function onWindowLoad() {
  gameLogic.spawn();
  gameLogic.spawn();
  updateView();
}

// eslint-disable-next-line no-unused-vars
function onReset() {
  gameLogic.reset();
  displayBanner(false);
  onWindowLoad();
}
