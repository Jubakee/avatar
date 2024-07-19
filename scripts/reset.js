//#region Reset Game
function resetGame() {
    coins = 0;
    energy = 1000; // Reset energy to starting value
    level = 1; // Reset level to starting value
    coinsPerClick = 1; // Reset coins per click

    // Clear saved data from local storage
    localStorage.removeItem('avatar_coins');
    localStorage.removeItem('avatar_energy');
    localStorage.removeItem('avatar_lastupdate');

    // Update the UI
    document.getElementById('coins').innerText = coins;
    updateEnergyBar();
    updateLevelDisplay();
}
//#endregion