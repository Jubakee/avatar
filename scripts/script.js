Telegram.WebApp.ready();
Telegram.WebApp.expand();
document.addEventListener('DOMContentLoaded', () => {

})

window.addEventListener('load', () => {
loadCoins();
loadEnergy();
setInterval(rechargeEnergy, rechargeInterval);
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
document.getElementById("clickable-coin").addEventListener("touch", function(event) {
    event.preventDefault(); // Prevent default touch behavior
    coinClicked(event);
    navigator.vibrate(100); // Vibrate on touch
});

// document.getElementById("clickable-coin").addEventListener("click", function(event) {
//     event.preventDefault(); // Prevent default touch behavior
//     coinClicked(event);
//     navigator.vibrate(100); // Vibrate on touch
// });

function coinClicked(event) {
    const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
    const touchCount = touches.length;

    if (energy <= 0) {
        alert("Not enough energy to click the coin!");
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
}

function animateCoin() {
    const coinImage = document.querySelector('#clickable-coin img');
    coinImage.classList.remove('clicked');
    void coinImage.offsetWidth; // Trigger reflow for CSS animation
    coinImage.classList.add('clicked');
}

function batchFeedback(touches, amount) {
    for (const touch of touches) {
        feedbackQueue.push({ x: touch.clientX, y: touch.clientY, amount });
    }

    if (!feedbackQueue.length) return;

    requestAnimationFrame(() => {
        const feedbacks = feedbackQueue.splice(0, feedbackQueue.length); // Clear the queue
        for (const feedback of feedbacks) {
            createFeedback(feedback.x, feedback.y, feedback.amount);
        }
    });
}

function createFeedback(x, y, amount) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerText = `+${amount}`; // Display the amount of coins
    feedback.style.position = 'absolute'; // Positioning for animation
    feedback.style.left = `${x}px`;
    feedback.style.top = `${y}px`;
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
    feedback.addEventListener('animationend', () => {
        feedback.remove();
    }, { once: true });
}

//#endregion

//#region Shop
document.getElementById("purchase-chest").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default touch behavior
    confirmPurchase(event);
    console.log('click')
});

function confirmPurchase() {
    const cost = 10; // Cost of the item
    const savedCoins = parseInt(localStorage.getItem('avatar_counter'), 10) || 0;

    if (savedCoins >= cost) {
        const confirmMessage = `Are you sure you want to purchase the Chest for ${cost} coins?`;
        const userConfirm = confirm(confirmMessage);

        if (userConfirm) {
            const coins = savedCoins - cost;
            localStorage.setItem('avatar_coins', coins);
            let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
            inventory.push({ 
                name: 'Chest', 
                image: './assets/chest.png', 
                stats: 'Open to receive a random Item!', 
                type: 'chest', 
                borderColor: 'gold',
                position: inventory.length // Save current position
            });
            localStorage.setItem('inventory', JSON.stringify(inventory));
        
            // Update displayed count
            document.getElementById('count').innerText = count;

        }
    } else {
        alert('Not enough coins!');
    }
}
//#endregion