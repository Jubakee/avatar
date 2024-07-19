// Initialize the Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.expand();


document.addEventListener('DOMContentLoaded', () => {
    // Code to run on DOMContentLoaded if needed
        // Reload the page once on load
        if (!sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'true');
            location.reload();
        }
});

window.addEventListener('load', () => {
    resetGame();
    loadCoins();
    loadEnergy();
    loadLevel();
    setInterval(rechargeEnergy, rechargeInterval);
    setupTabEventListeners();
});