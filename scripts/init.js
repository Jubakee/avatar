// Initialize the Telegram WebApp
window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

window.Telegram.WebApp.disableVerticalSwipes();

window.addEventListener('load', () => {
    resetGame();
    loadCoins();
    loadEnergy();
    loadLevel();
    setInterval(rechargeEnergy, rechargeInterval);
    setupTabEventListeners();
});