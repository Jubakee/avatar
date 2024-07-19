// Initialize the Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.expand();

document.addEventListener('DOMContentLoaded', () => {
    // Code to run on DOMContentLoaded if needed
});

window.addEventListener('load', () => {
    //resetGame();
    loadCoins();
    loadEnergy();
    loadLevel();
    setInterval(rechargeEnergy, rechargeInterval);
    setupTabEventListeners();
});