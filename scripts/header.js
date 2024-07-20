document.addEventListener('DOMContentLoaded', function() {
    const incomeElement = document.getElementById('income');
    const timeUnitSelect = document.getElementById('time-unit');

    let baseIncomePerSec = 1; // Your base income per second
    let incomeInterval;

    const timeUnits = {
        sec: 1,
        min: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2592000, // approx 30 days
        year: 31536000 // approx 365 days
    };

    function updateIncomeDisplay() {
        const selectedUnit = timeUnitSelect.value;
        const multiplier = timeUnits[selectedUnit];
        const adjustedIncome = baseIncomePerSec * multiplier;
        incomeElement.textContent = `${adjustedIncome.toLocaleString()} p/${selectedUnit}`;
    }

    function updateCoins() {
        coins += baseIncomePerSec;
        document.getElementById('coins').innerText = coins;
        saveCoins();
    }

    function startIncomeInterval() {
        if (incomeInterval) clearInterval(incomeInterval);
        incomeInterval = setInterval(updateCoins, 1000);
    }

    timeUnitSelect.addEventListener('change', function() {
        baseIncomePerSec = timeUnits[timeUnitSelect.value];
        updateIncomeDisplay();
        startIncomeInterval();
    });

    // Initialize the display and start the income interval
    updateIncomeDisplay();
    startIncomeInterval();
});
