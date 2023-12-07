function animateDice() {
    let diceImage = document.getElementById('diceImage');
    diceImage.classList.add('dice-filter'); // Fügt den Filtereffekt hinzu
    let randomDice;

    let startTime = new Date().getTime();
    let interval = setInterval(() => {
        let now = new Date().getTime();
        let elapsedTime = now - startTime;

        if (elapsedTime > 1000) { // 1 Sekunde lang
            clearInterval(interval); // Stoppt die Animation
            diceImage.classList.remove('dice-filter'); // Entfernt den Filtereffekt
            diceImage.src = `img/dice-${diceResult}.svg`; // Zeigt das echte Ergebnis an
        } else {
            // Zeigt ein zufälliges Würfelbild an
            let randomValue = Math.floor(Math.random() * 6) + 1;
            randomDice = randomValue == randomDice ? (randomDice + 1 == 7 ? 1 : randomDice + 1) : randomValue;
            diceImage.src = `img/dice-${randomDice}.svg`;
        }
    }, 100); // Aktualisiert das Bild alle 100ms
}

function rollDice() {
    if (!hasRolled) {
        diceResult = Math.floor(Math.random() * 6) + 1;
        document.getElementById('diceImage').src = `img/dice-${diceResult}.svg`;
        animateDice();
        hasRolled = true;
    }
    return diceResult;
}