
export class Ship {
    constructor(length, name) {
        this.length = length;
        this.isAlive = true;
        this.health = length;
        this.coordinates = [];
        this.name = name;
    }

    hit() {
        this.health -= 1;
        if (this.health == 0) {
            this.isAlive = false;
        }
    }
}

export class Gameboard {
    constructor() {
        this.filledBoard = [];
        this.missed = [];
        this.disabled = [];
    }
    
    isValidCoordinates(coordinateArray, ship, direction) {
        for (let i = 0; i < ship.length; i++) {
            if (direction == "vertical") {
                ship.coordinates.push([coordinateArray[0] + i,coordinateArray[1]]);
            } else {
                ship.coordinates.push([coordinateArray[0],coordinateArray[1] + i]);
            }
        };
        
        for (let i = 0; i < ship.coordinates.length; i++) {
            if (
                this.filledBoard.some((cords) => JSON.stringify(cords) == JSON.stringify(ship.coordinates[i])) || 
                this.disabled.some((cords) =>  JSON.stringify(cords) == JSON.stringify(ship.coordinates[i]))
            ) {
                return "invalid position";
            } 
        } 
        return "valid position"
    }

    putShipOnBoard(coordinateArray, shipSize, shipName, direction) {
        const newShip = new Ship(shipSize, shipName);
        const isItValid = this.isValidCoordinates(coordinateArray, newShip, direction);
        if (isItValid == "valid position") {
            for (let i = 0; i < shipSize; i++) {
                if (direction == "vertical") {
                    this.filledBoard.push([coordinateArray[0] + i,coordinateArray[1]]);
                } else {
                    this.filledBoard.push([coordinateArray[0],coordinateArray[1] + i]);
                }
            }
            return newShip;      

        } else {
            return "invalid position";
        }
    }

    recieveAttack(attackedSpot) {
        for (let i = 0; i < this.filledBoard.length; i++) {
            if (this.filledBoard[i][0] == attackedSpot[0] && this.filledBoard[i][1] == attackedSpot[1]) {
                carrierShip.hit();
                break;
            } else {
                this.missedAttack(attackedSpot);
                break;
            }
        }
    }

    missedAttack(attackedSpot) {
        this.missed.push(attackedSpot);
    }
}

