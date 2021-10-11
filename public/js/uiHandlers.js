function onKeyup(e){
    const { key } = e;
    // console.log(key);
    const gameEvent = keymap.get(key);
    if (!gameEvent){
        return;
    }
    const hasDifference = gameEvent.call(gameLogic);
    // console.log('hasDifference', hasDifference);
    if (!hasDifference){
        const hasAnotherTurn = gameLogic.hasAnotherTurn();
        // console.log(hasAnotherTurn);
        if (!hasAnotherTurn){
            return displayBanner(show = true, win = false);
        }
        return;
    }
    const spawned = gameLogic.spawn();
    // console.log('block spawned', spawned);
    if (spawned){
        return updateView();
    }

}

function onWindowLoad(e){
    gameLogic.spawn();
    gameLogic.spawn();
    updateView();
}

function onReset(){
    gameLogic.reset();
    displayBanner(show = false);
    onWindowLoad();
}