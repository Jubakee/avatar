document.getElementById("clickable-coin").addEventListener("touchstart", function(event) {
    event.preventDefault();
    coinClicked(event);
    if (navigator.vibrate) navigator.vibrate(100); // Vibrate on touch
});

document.getElementById("clickable-coin").addEventListener("click", function(event) {
    coinClicked(event);
    if (navigator.vibrate) navigator.vibrate(100); // Vibrate on click
});

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
    console.log(coinsPerClick)
    energy = Math.max(0, energy - touchCount);

    document.getElementById('coins').innerText = formatNumber(coins);
    saveCoins();
    saveEnergy();
    updateEnergyBar();
    updateLevel();
}

function animateCoin() {
    const coinImage = document.querySelector('#clickable-coin img');
    if (coinImage) {
        coinImage.classList.add('clicked');
        setTimeout(() => {
            coinImage.classList.remove('clicked');
        }, 300); // Duration should match the transition duration in CSS
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
