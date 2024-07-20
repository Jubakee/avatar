//#region Levels
function updateLevel() {
    while (coins >= level * levelUpThreshold) {
        level++;
        coinsPerClick = level; // Increase coins per click
        updateLevelDisplay(); // Update level display
    }
}

function updateLevelDisplay() {
    const levelDisplay = document.getElementById('level-value');
    if (levelDisplay) {
        levelDisplay.innerText = `Lvl ${level}`; // Correctly update the displayed level
    }
}
//#endregion