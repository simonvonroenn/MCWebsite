let currentStage = 0;

const stages = [
    // Hier fügen Sie die Logik für jede Phase des Bestellvorgangs ein
    {
        name: "waitingInLine",
        image: "img/waiting_in_line.jpg",
        buttonText: "Warten",
        repeat: 3 // Angenommen, Sie warten 3 Mal
    },
    {
        name: "chooseTray",
        image: "img/choose_tray.jpg",
        buttonText: "Tablett nehmen",
        setupFunction: setupDragAndDrop
    }
    // Weitere Phasen...
];

function nextStage() {
    if (stages[currentStage].name === "waitingInLine" && stages[currentStage].repeat > 1) {
        stages[currentStage].repeat--;
    } else {
        currentStage++;
    }

    if (currentStage < stages.length) {
        updateStage();
    } else {
        // Simulation beenden
        document.getElementById('interactionArea').innerHTML = "<p>Simulation beendet!</p>";
    }
}

function updateStage() {
    const stage = stages[currentStage];
    document.getElementById('currentImage').src = stage.image;
    const interactionArea = document.getElementById('interactionArea');

    // Clear existing content
    interactionArea.innerHTML = '';

    // Call specific setup function for the stage if it exists
    if (stage.setupFunction) {
        stage.setupFunction();
    } else {
        // Default button for stages without special interaction
        interactionArea.innerHTML = `<button onclick="nextStage()">${stage.buttonText}</button>`;
    }
}

// Function to set up drag and drop for the 'chooseTray' stage
function setupDragAndDrop() {
    const interactionArea = document.getElementById('interactionArea');
    interactionArea.innerHTML = `
        <div id="dragDropArea">
            <img id="trayImage" src="img/tray.jpg" draggable="true" ondragstart="drag(event)" width="100" height="100">
            <div id="dropZone" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        </div>
    `;
}


// Drag and Drop Functions
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    // Save progress
    localStorage.setItem("trayPlaced", "true");
}

// Reset Progress Function
function resetProgress() {
    localStorage.clear();
    location.reload(); // Reload the page to reset the state
}


window.onload = updateStage; // Initialisiert die erste Phase beim Laden der Seite