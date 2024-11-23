let currentPlayer = null;

function getCurrentPlayer() {
    return currentPlayer;
};

function changeCurrentPlayer() {
    if (currentPlayer == "player 1") {
        currentPlayer = "player 2";
    } else if (currentPlayer == "player 2" || currentPlayer == null) {
        currentPlayer = "player 1";
    } 
}

export {getCurrentPlayer, changeCurrentPlayer};