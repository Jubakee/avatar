Telegram.WebApp.ready();
Telegram.WebApp.expand();
document.addEventListener('DOMContentLoaded', () => {

})

window.addEventListener('load', () => {
loadCounter();
setupTabEventListeners();
Telegram.WebApp.disableSwipeBack();
});

//#region Load & Save
function loadCounter() {
    const savedCoins = localStorage.getItem('avatar_coins');
    const savedEnergy = localStorage.getItem('avatar_energy');
    const savedLastUpdate = localStorage.getItem('avatar_lastupdate');

    console.log('Coins: ' + savedCoins, 'Energy: ' + savedEnergy);

    if (savedCoins !== null) {
        coins = parseInt(savedCoins, 10);
        document.getElementById('coins').innerText = coins;
    }
}

function saveCounter() {
    localStorage.setItem('avatar_coins', coins);
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
    console.log('Saved to Local Storage.')
}
//#endregion

//#region Tabs
function setupTabEventListeners() {
    const tabButtons = document.querySelectorAll('.tab');

    tabButtons.forEach(button => {
        const tabId = button.id.replace('-btn', '');
        
        button.addEventListener('click', () => showTab(tabId));
    });
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('main');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');

    const buttons = document.querySelectorAll('.tab');
    buttons.forEach(button => {
        button.classList.remove('active-tab');
    });
    document.getElementById(tabId + '-btn').classList.add('active-tab');

    document.getElementById('coins').innerText = coins;
}
//#endregion