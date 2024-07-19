

// Initialize the Telegram WebApp
Telegram.WebApp.ready();
Telegram.WebApp.expand();

document.addEventListener('DOMContentLoaded', () => {
    // Code to run on DOMContentLoaded if needed
});

window.addEventListener('load', () => {
    resetGame();
    loadCoins();
    loadEnergy();
    loadLevel();
    setInterval(rechargeEnergy, rechargeInterval);
    setupTabEventListeners();
});

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

function loadLevel() {
    updateLevel();
}

function saveCoins() {
    localStorage.setItem('avatar_coins', coins);
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

function updateEnergyBar() {
    const energyFill = document.getElementById('energy-fill');
    const energyValue = document.getElementById('energy-count');
    if (energyFill && energyValue) {
        energyFill.style.width = `${(energy / maxEnergy) * 100}%`;
        energyValue.innerText = energy;
    }
}
//#endregion

//#region Coin
document.getElementById("clickable-coin").addEventListener("touchstart", function(event) {
    event.preventDefault();
    coinClicked(event);
    if (navigator.vibrate) navigator.vibrate(100); // Vibrate on touch
});

document.getElementById("clickable-coin").addEventListener("click", function(event) {
    coinClicked(event);
    if (navigator.vibrate) navigator.vibrate(100); // Vibrate on click
});

function coinClicked(event) {
    event.preventDefault();
    const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
    const touchCount = touches.length;

    if (energy <= 0) {
        showNotification("Not enough energy to click the coin!");
        return;
    }

    updateGameState(touchCount);
    animateCoin();
    batchFeedback(touches, coinsPerClick); // Batch feedback animations
}

function updateGameState(touchCount) {
    coins += touchCount * coinsPerClick;
    energy = Math.max(0, energy - touchCount);
    document.getElementById('coins').innerText = coins;
    saveCoins();
    saveEnergy();
    updateEnergyBar();
    updateLevel();
}

function animateCoin() {
    const coinImage = document.querySelector('#clickable-coin img');
    if (coinImage) {
        coinImage.classList.remove('clicked');
        void coinImage.offsetWidth; // Trigger reflow for CSS animation
        coinImage.classList.add('clicked');
    }
}

function batchFeedback(touches, amount) {
    for (const touch of touches) {
        feedbackQueue.push({ x: touch.clientX, y: touch.clientY, amount });
    }

    if (!feedbackQueue.length) return;

    requestAnimationFrame(() => {
        const feedbacks = feedbackQueue.splice(0, feedbackQueue.length); // Clear the queue
        feedbacks.forEach(feedback => {
            createFeedback(feedback.x, feedback.y, feedback.amount);
        });
    });
}

function createFeedback(x, y, amount) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerText = `+${amount}`; // Display the amount of coins
    feedback.style.left = `${x}px`;
    feedback.style.top = `${y}px`;
    document.body.appendChild(feedback);

    // Trigger feedback animation
    requestAnimationFrame(() => {
        feedback.classList.add('show');
    });

    // Remove the feedback element after animation
    setTimeout(() => {
        feedback.classList.remove('show');
        feedback.classList.add('hidden');
        feedback.addEventListener('transitionend', () => {
            feedback.remove();
        }, { once: true });
    }, 600); // Match the duration of the animation
}
//#endregion

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
        levelDisplay.innerText = `Lvl: ${level}`; // Correctly update the displayed level
    }
}
//#endregion

//#region Shop
// Implement shop functionality if needed
//#endregion

//#region Inventory
// Implement inventory functionality if needed
//#endregion

//#region Popups
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.innerText = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000); // Hide the notification after 5 seconds
    }
}
//#endregion
