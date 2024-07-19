// Initialize the Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.expand();
window.Telegram.WebApp.disableVerticalSwipes();

window.addEventListener('load', () => {
    //resetGame();
    loadCoins();
    loadEnergy();
    loadLevel();
    setInterval(rechargeEnergy, rechargeInterval);
    setupTabEventListeners();
});