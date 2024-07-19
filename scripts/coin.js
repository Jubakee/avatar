//#region Coin
document.getElementById("clickable-coin").addEventListener("touchstart", function(event) {
    event.preventDefault();
    coinClicked(event);
    if (navigator.vibrate) navigator.vibrate(100); // Vibrate on touch
});

// document.getElementById("clickable-coin").addEventListener("click", function(event) {
//     coinClicked(event);
//     if (navigator.vibrate) navigator.vibrate(100); // Vibrate on click
// });

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