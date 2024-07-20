//#region Load & Save
function loadCoins() {
    const savedCoins = localStorage.getItem('avatar_coins');
    if (savedCoins !== null) {
        coins = parseInt(savedCoins, 10);
        
        document.getElementById('coins').innerText = formatNumber(coins);
    }

}

function formatNumber(number) {
    if (number >= 1e12) {
        return (number / 1e12).toFixed(2) + 'T';
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + 'B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M';
    } else if (number >= 1e5) {
        return (number / 1e3).toFixed(0) + 'K';
    } else {
        return number.toLocaleString();
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