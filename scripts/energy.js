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