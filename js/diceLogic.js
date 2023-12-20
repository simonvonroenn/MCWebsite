/**
 * This is the javascript file that contains all the logic regarding rolling the dice.
 */

let diceResult = 0;
let hasRolled = false; // Flag that shows if the current player has already rolled the dice
let rollCounter = 1; // If a player has no valid moves, he can roll the dice 3x

/** 
 * Create the dice animation that is shown when rolling the dice.
 */
function animateDice() {
    let diceImage = document.getElementById('diceImage');
    diceImage.classList.add('dice-filter'); // Add the filter effect
    let randomDice;

    let startTime = new Date().getTime();
    let interval = setInterval(() => {
        let now = new Date().getTime();
        let elapsedTime = now - startTime;

        if (elapsedTime > 1000) { // 1 second long
            clearInterval(interval); // Stop the animation
            diceImage.classList.remove('dice-filter'); // Remove the filter effect
            diceImage.src = `img/dice/dice-${diceResult}.svg`; // Display the real result
        } else {
            // Displas a random dice result
            let randomValue = Math.floor(Math.random() * 6) + 1;
            randomDice = randomValue == randomDice ? (randomDice + 1 == 7 ? 1 : randomDice + 1) : randomValue;
            diceImage.src = `img/dice/dice-${randomDice}.svg`;
        }
    }, 100); // Refresh the image every 100ms
}

/** 
 * This method contains the logic for rolling the dice. 
 */
function rollDice() {
    if (!hasRolled) {
        diceResult = Math.floor(Math.random() * 6) + 1;
        document.getElementById('diceImage').src = `img/dice/dice-${diceResult}.svg`;
        animateDice();
        hasRolled = true;
        
        color = colors[currentColorIndex];
        calculateValidMoves(color);
        if (!hasValidMoves(color)) {
            if (rollCounter == 3) {
                rollCounter = 1;
                animateSkip();
                changeColor();
            } else {
                hasRolled = false;
                rollCounter++;
            }
        }
    }
}