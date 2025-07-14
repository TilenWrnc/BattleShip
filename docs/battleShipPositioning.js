import { Ship, Gameboard } from "./battleShipObjects.js";
import { createBoard } from './createGameboard.js';
import {getCurrentDirection, changeDirection } from "./direction.js";
import {changeCurrentPlayer, getCurrentPlayer} from "./currentPlayer.js";



document.addEventListener("DOMContentLoaded", () => {
    createBoard(); 
    console.log(getCurrentPlayer());

    const playerOneGameboard = new Gameboard();
    const playerTwoGameboard = new Gameboard();

    const shipButton = document.querySelectorAll(".ship");
    const allyGameboard = document.querySelectorAll(".gameboard-element");
    const enemyGameboard = document.querySelectorAll(".enemy-gameboard-element")
    const verticalButton = document.querySelector(".vertical");
    const horizontalButton = document.querySelector(".horizontal");
    const startButton = document.querySelector(".start-button");

    let allyShips = {};
    let currentShip = null;

    function updateBoard(gameboard,currentGameboard) {
        gameboard.forEach((position) => {
            if (currentGameboard.filledBoard.some(cords => JSON.stringify(cords) === position.dataset.coordinates)
            ) {
                position.classList.remove("avaliable");
                position.classList.add("filled");
            }
            if (currentGameboard.disabled.some(cords => JSON.stringify(cords) === position.dataset.coordinates)
            ) {
                position.classList.remove("avaliable");
                position.classList.add("unavaliable");
            }
        });
    }

    function createShipArray(currentShip) {
        const shipKey = `${currentShip.name}`;
        allyShips[shipKey] = new Ship(currentShip.length, currentShip.name);
    }

    function updateShipButton() {
        shipButton.forEach((button) => {
            const shipName = button.textContent.split(" ")[0];
            if (currentShip.name == shipName) {
                button.classList.add("unavaliable");
                button.textContent = "SHIP USED";
            }
        });
        currentShip = null;
    }

    function setNeighbors([x,y], currentGameboard) {
        const neighbors = [
            [x-1, y],   // Left
            [x+1, y],   // Right
            [x, y-1],   // Up
            [x, y+1],   // Down
            [x-1, y-1], // Top-left
            [x+1, y-1], // Top-right
            [x-1, y+1], // Bottom-left
            [x+1, y+1], // Bottom-right
        ]
            const filteredNeighbors = neighbors.filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < 10 && ny < 10);
            filteredNeighbors.forEach((neighbor) => {
            const isNeighborFilled = currentGameboard.filledBoard.some(cords => JSON.stringify(cords) === JSON.stringify(neighbor));
            const isNeighborDisabled = currentGameboard.disabled.some(cords => JSON.stringify(cords) === JSON.stringify(neighbor));
    
            if (!isNeighborFilled && !isNeighborDisabled) {
                currentGameboard.disabled.push(neighbor);
            }
        })
    }

    function getNeighbors(arrayOfCoordinates,currentGameboard) {
        for (let i = 0; i < arrayOfCoordinates.length; i++) {
            setNeighbors(arrayOfCoordinates[i], currentGameboard);
        }
    }

    verticalButton.addEventListener("click", () => {
        if (getCurrentDirection() !== "vertical") {
            changeDirection();
        }
        console.log(getCurrentDirection());
    });

    horizontalButton.addEventListener("click", () => {
        if (getCurrentDirection() !== "horizontal") {
            changeDirection();
        }
    })

    allyGameboard.forEach((position) => {
            position.addEventListener("click", () => {  
                let positionCoordinates = JSON.parse(position.dataset.coordinates);
                if (currentShip !== null && getCurrentPlayer() == null) {
                    if ((currentShip.length + positionCoordinates[0] <= 10 && getCurrentDirection() == "vertical") ||
                        (currentShip.length + positionCoordinates[1] <= 10 && getCurrentDirection() == "horizontal")) {
                        const succesfullyPlaces = playerOneGameboard.putShipOnBoard(positionCoordinates, currentShip.length, currentShip.name, getCurrentDirection());
                        if (succesfullyPlaces !== "invalid position") {
                            getNeighbors(playerOneGameboard.filledBoard,playerOneGameboard);
                            createShipArray(currentShip);
                            updateBoard(allyGameboard,playerOneGameboard);
                            updateShipButton();
                        } 
                    }
                }
            
        })
    })

    shipButton.forEach((button) => {
        button.addEventListener("click", () => {
            const shipName = button.textContent.split(" ")[0];
            const length = parseInt(button.dataset.length);
            currentShip = new Ship(length, shipName);
            shipButton.forEach((button) => {
                if (!button.classList.contains("unavaliable")) {
                    button.style.backgroundColor = "white";
                }
            })
            button.style.backgroundColor = "lightgrey";
        })
    })

    
    function getRandomCoordinates() {
        const min = 0;
        const max = 9;
        return Math.floor((Math.random() * (max - min + 1) + min));
    }
    
    function enemyShipPlacement(currentShip) {
        let placed = false;
        const direction = ["vertical", "horizontal"];
        while (!placed) {
            const x = getRandomCoordinates();
            const y = getRandomCoordinates();
            let currentEnemyShipDirection = direction[Math.floor(Math.random() * direction.length)];
    
            if (
                (currentShip.length + x <= 10 && currentEnemyShipDirection === "vertical") ||
                (currentShip.length + y <= 10 && currentEnemyShipDirection === "horizontal")
            ) {
            const result = playerTwoGameboard.putShipOnBoard([x, y], currentShip.length, currentShip.name, currentEnemyShipDirection);
            if (result !== "invalid position") {
                    placed = true;
                }
            }
        }
    }

    function changePointerEvents(currentGameboard) {
        console.log(getCurrentPlayer());
        currentGameboard.forEach((position) => {
            if (getCurrentPlayer() === "player 2") {
                position.style.pointerEvents = "none";
            } else if (getCurrentPlayer() == "player 1") {
                position.style.pointerEvents = "all";
            }
        })
    }

    function gameStartPopup() {
        const popup = document.querySelector(".game-start-popup");
        popup.classList.add("animation-start");
      
    };


    startButton.addEventListener("click", () => {
        if (Object.keys(allyShips).length < 5 ) {
            alert("Can only start when all ships are set")
        } else {
            for (let shipIndentificator in allyShips) {
                let ship = allyShips[shipIndentificator];
                currentShip = ship;
                enemyShipPlacement(currentShip);
                getNeighbors(playerTwoGameboard.filledBoard,playerTwoGameboard);

            }   
            changeCurrentPlayer();
            gameStartPopup();
        }
    });

    function enemyShots() {
        let placed = false;
        let coordinate = null;
        while (!placed) {
            const x = getRandomCoordinates();
            const y = getRandomCoordinates();

            const result = playerOneGameboard.enemyShotsTracker([x,y]);
            if (result != "invalid") {
                placed = true;
                coordinate = [x,y];
            }
        }

        allyGameboard.forEach((position) => {
            if (JSON.parse(position.dataset.coordinates)[0] == coordinate[0] && JSON.parse(position.dataset.coordinates)[1] == coordinate[1]) {
                const result = playerOneGameboard.recieveAttack(coordinate);
                if (result == "hit") {
                    Object.assign(position.style, {
                        backgroundColor: "red",
                        pointerEvents: "none",
                    });
                    position.innerHTML = "X";
                } else {
                    Object.assign(position.style, {
                        backgroundColor: "darkgrey",
                        pointerEvents: "none",
                    });
                }
                if (playerOneGameboard.health == 0 || playerTwoGameboard.health == 0) {

                }
            }
        })
        changeCurrentPlayer();
        changePointerEvents(enemyGameboard);
    }

    enemyGameboard.forEach((position) => {
            position.addEventListener("click", () => {
                if (getCurrentPlayer() === "player 1") {
                    const result = playerTwoGameboard.recieveAttack(JSON.parse(position.dataset.coordinates));
                    if (result == "hit") {
                        Object.assign(position.style, {
                            backgroundColor: "red",
                            pointerEvents: "none",
                        });
                        position.innerHTML = "X";
                    } else {
                        Object.assign(position.style, {
                            backgroundColor: "darkgrey",
                            pointerEvents: "none",
                        });
                    }
                    changeCurrentPlayer();
                    changePointerEvents(enemyGameboard);
                    setTimeout(() => {
                    enemyShots();
                    }, 1500);
                }
                
            })
    })

})

