Telegram.WebApp.ready();
Telegram.WebApp.expand();
document.addEventListener('DOMContentLoaded', () => {

})

window.addEventListener('load', () => {
loadCoins();
loadEnergy();
setInterval(rechargeEnergy, rechargeInterval);
startRechargeTimer();
setupTabEventListeners();
});

//#region Load & Save
function loadCoins() {
    const savedCoins = localStorage.getItem('avatar_coins');

    if (savedCoins !== null) {
        coins = parseInt(savedCoins, 10);
        document.getElementById('coins').innerText = coins;
    }
}

function loadEnergy() {
    const savedEnergy = localStorage.getItem('avatar_energy');
    const savedLastUpdate = localStorage.getItem('avatar_lastupdate');

    if (savedEnergy) {
        energy = Math.min(parseInt(savedEnergy, 10), maxEnergy); // Cap energy at max
    }

    if (savedLastUpdate) {
        lastUpdateTime = parseInt(savedLastUpdate, 10);
        const elapsedTime = Date.now() - lastUpdateTime;
        energy += Math.floor(elapsedTime / rechargeInterval) * energyRechargeRate;
        energy = Math.min(energy, maxEnergy); // Cap energy at max
        lastUpdateTime = Date.now() - (elapsedTime % rechargeInterval); // Adjust lastUpdateTime correctly
    }

    updateEnergyBar();
}

function saveCoins() {
    localStorage.setItem('avatar_coins', coins);
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
    console.log('Saved to Local Storage.')
}
function saveEnergy() {
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
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

//#region Energy
function rechargeEnergy() {
    const now = Date.now();
    const elapsedTime = now - lastUpdateTime;
    const rechargeAmount = Math.floor(elapsedTime / rechargeInterval) * energyRechargeRate;

    if (rechargeAmount > 0) {
        energy = Math.min(energy + rechargeAmount, maxEnergy);
        lastUpdateTime += Math.floor(elapsedTime / rechargeInterval) * rechargeInterval; // Adjust lastUpdateTime correctly
        updateEnergyBar();
        saveEnergy();
    }
}


function saveEnergy() {
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
}

function updateEnergyBar() {
    const energyFill = document.getElementById('energy-fill');
    const energyValue = document.getElementById('energy-count');
    energyFill.style.width = `${(energy / maxEnergy) * 100}%`;
    energyValue.innerText = energy;
}
//#endregion

//#region Coin
document.getElementById("clickable-coin").addEventListener("click", function(event) {
    coinClicked(event);
    navigator.vibrate(100); // Vibrate on touch
    console.log('good')
});

function coinClicked(event) {
    event.preventDefault();
    const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
    const touchCount = touches.length;

    if (energy <= 0) {
        alert("Not enough energy to click the cabbage!");
        return;
    }

    updateGameState(touchCount);
    animateCoin();
    provideFeedback(touches, coinsPerClick);
}

function updateGameState(touchCount) {
    coins += touchCount * coinsPerClick;
    energy = Math.max(0, energy - touchCount); // Prevent negative energy
    document.getElementById('coins').innerText = coins;
    saveCoins();
    saveEnergy();
    updateEnergyBar();
}

function animateCoin() {
    const coinImage = document.querySelector('#clickable-coin img');
    coinImage.classList.remove('clicked');
    void coinImage.offsetWidth;
    coinImage.classList.add('clicked');
    setTimeout(() => {
        coinImage.classList.remove('clicked');
    }, 300);
}

function provideFeedback(touches, amount) {
    for (const touch of touches) {
        createFeedback(touch.clientX, touch.clientY, amount);
    }
}

function createFeedback(x, y, amount) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerText = `+${amount}`; // Display the amount of coins
    feedback.style.position = 'absolute'; // Positioning for animation
    feedback.style.left = `${x}px`;
    feedback.style.top = `${y}px`;
    feedback.style.opacity = 1; // Start fully visible
    document.body.appendChild(feedback);

    // Animation for moving up and fading out
    feedback.animate([
        { transform: 'translateY(0)', opacity: 1 }, // Start position
        { transform: 'translateY(-30px)', opacity: 0 } // End position
    ], {
        duration: 600, // Total duration of the animation
        easing: 'ease-out',
        fill: 'forwards' // Retain the final state
    });

    // Remove the feedback element after animation
    setTimeout(() => {
        feedback.remove();
    }, 600);
}

//#endregion