document.addEventListener('DOMContentLoaded', function() {
    const incomeElement = document.getElementById('income');
    const timeUnitSelect = document.getElementById('time-unit');

    let baseIncomePerSec = 1; // Default base income per second
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

    function loadIncome() {
        const savedIncome = localStorage.getItem('avatar_base_income');
        if (savedIncome !== null) {
            baseIncomePerSec = parseInt(savedIncome, 10);
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

    function updateIncomeDisplay() {
        const selectedUnit = timeUnitSelect.value;
        const multiplier = timeUnits[selectedUnit];
        const adjustedIncome = baseIncomePerSec * multiplier;
        incomeElement.textContent = `${formatNumber(adjustedIncome)} p/${selectedUnit}`;
    }

    function updateCoins() {
        coins += baseIncomePerSec;
        document.getElementById('coins').innerText = formatNumber(coins);
        saveCoins();
    }

    function startIncomeInterval() {
        if (incomeInterval) clearInterval(incomeInterval);
        incomeInterval = setInterval(updateCoins, 1000);
    }

    timeUnitSelect.addEventListener('change', function() {
        updateIncomeDisplay();
    });

    // Load saved income and coins
    loadIncome();
    loadCoins();

    // Initialize the display and start the income interval
    updateIncomeDisplay();
    startIncomeInterval();
});
