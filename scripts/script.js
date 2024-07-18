Telegram.WebApp.ready();
Telegram.WebApp.expand();

document.addEventListener('DOMContentLoaded', () => {

})

window.addEventListener('load', () => {
loadCounter();
});


function loadCounter() {
    const savedCoins = localStorage.getItem('avatar_coins');
    const savedEnergy = localStorage.getItem('avatar_energy');
    const savedLastUpdate = localStorage.getItem('avatar_lastupdate');

    console.log(savedCoins, savedEnergy, savedLastUpdate);

    // Load coins
    if (savedCoins !== null) {
        coins = parseInt(savedCoins, 10);
        document.getElementById('coins').innerText = coins;
    }

    // Load energy and update if needed
    // if (savedEnergy !== null && savedLastUpdate !== null) {
    //     energy = parseInt(savedEnergy, 10);
    //     lastUpdateTime = parseInt(savedLastUpdate, 10);

    //     // Calculate elapsed time since last update
    //     const elapsedTime = Date.now() - lastUpdateTime;

    //     // Calculate energy regeneration
    //     if (elapsedTime > 0) {
    //         const energyToAdd = Math.floor(elapsedTime / rechargeInterval) * energyRechargeRate;
    //         energy = Math.min(energy + energyToAdd, maxEnergy); // Cap energy at max
    //     }
    // }

    // // Update UI with loaded energy
    // document.getElementById('energy').innerText = energy;
}


function saveCounter() {
    localStorage.setItem('avatar_coins', coins);
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
    console.log('Saved')

}