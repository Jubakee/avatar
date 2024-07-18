Telegram.WebApp.ready();
Telegram.WebApp.expand();

document.addEventListener('DOMContentLoaded', () => {
    Telegram.WebApp.disableSwipeBack();
})

window.addEventListener('load', () => {
loadCounter();
});


function loadCounter() {
    const savedCoins = localStorage.getItem('avatar_coins');
    const savedEnergy = localStorage.getItem('avatar_energy');
    const savedLastUpdate = localStorage.getItem('avatar_lastupdate');

    console.log(savedCoins, savedEnergy, savedLastUpdate)


    // if (savedCoins) {
    //     coins = parseInt(savedCoins, 10);
    //     document.getElementById('coins').innerText = coins;
    // }

    // if (savedEnergy) {
    //     energy = Math.min(parseInt(savedEnergy, 10), maxEnergy); // Cap energy at max
    // }

    // if (savedLastUpdate) {
    //     lastUpdateTime = parseInt(savedLastUpdate, 10);
    //     const elapsedTime = Date.now() - lastUpdateTime;
    //     energy += Math.floor(elapsedTime / rechargeInterval) * energyRechargeRate;
    //     energy = Math.min(energy, maxEnergy); // Cap energy at max
    // }
}

function saveCounter() {
    localStorage.setItem('avatar_coins', coins);
    localStorage.setItem('avatar_energy', energy);
    localStorage.setItem('avatar_lastupdate', Date.now());
    console.log('Saved')

}