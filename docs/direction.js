let currentDirection = "vertical";

function changeDirection() {
    if (currentDirection == "vertical") {
        currentDirection = "horizontal";
    } else {
        currentDirection = "vertical";
    }
    return currentDirection;
}

function getCurrentDirection(){
    return currentDirection;
};

export {currentDirection, getCurrentDirection, changeDirection};