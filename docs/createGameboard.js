export function createBoard () {
    const gameboardContainer = document.querySelector(".gameboard-container");
    const enemyGameboardContainer = document.querySelector(".enemy-gameboard-container");

    gameboardContainer.style.gridTemplateColumns = `repeat(10, 1fr)`;
    gameboardContainer.style.gridTemplateRows = `repeat(10, 1fr)`;
    enemyGameboardContainer.style.gridTemplateColumns = `repeat(10, 1fr)`;
    enemyGameboardContainer.style.gridTemplateRows = `repeat(10, 1fr)`;

    for (let j=0; j < 10 ; j++) {
        for (let i=0; i < 10 ; i++) {
            const gameboardElement = document.createElement("div");
            gameboardElement.classList.add("gameboard-element");
            gameboardElement.classList.add("avaliable");
            gameboardElement.dataset.coordinates = `[${j},${i}]`;
            gameboardContainer.appendChild(gameboardElement);
        } 
    };

    for (let j=0; j < 10 ; j++) {
        for (let i=0; i < 10 ; i++) {
            const enemyGameboardElement = document.createElement("div");
            enemyGameboardElement.classList.add("enemy-gameboard-element");
            enemyGameboardElement.classList.add("avaliable");
            enemyGameboardElement.dataset.coordinates = `[${j},${i}]`;
            enemyGameboardContainer.appendChild(enemyGameboardElement);
        } 
    };


}


