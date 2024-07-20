// Function to load the player's inventory from localStorage
function loadInventory() {
    let inventory = localStorage.getItem('avatar_inventory');
    if (inventory) {
        return JSON.parse(inventory);
    } else {
        return []; // Return an empty array if no inventory exists
    }
}

// Function to save the player's inventory to localStorage
function saveInventory(inventory) {
    localStorage.setItem('avatar_inventory', JSON.stringify(inventory));
}

// Function to get and increment the next unique ID
function getNextId() {
    let lastId = localStorage.getItem('last_item_id');
    if (lastId) {
        lastId = parseInt(lastId, 10) + 1;
    } else {
        lastId = 0; // Start from 0 if no ID exists
    }
    localStorage.setItem('last_item_id', lastId);
    return lastId;
}

// Function to get the player's current coins from localStorage
function getPlayerCoins() {
    let coins = localStorage.getItem('avatar_coins');
    return coins ? parseInt(coins, 10) : 0;
}

// Function to update the player's coins in localStorage
function updatePlayerCoins(amount) {
    let coins = getPlayerCoins();
    coins += amount;
    localStorage.setItem('avatar_coins', coins);
    loadCoins();
}

// Function to handle the purchase of an item
function handleBuyButtonClick(event) {
    // Check if the clicked element is a buy button
    if (event.target.classList.contains('buy-button')) {
        const inventory = loadInventory();
        const shopItem = event.target.closest('.shop-item');

        if (shopItem) {
            // Retrieve item details
            const name = shopItem.querySelector('.item-name').textContent;
            const description = shopItem.querySelector('.item-description').textContent;
            const priceText = shopItem.querySelector('.item-price').textContent;
            const type = shopItem.querySelector('.item-type').textContent;
            const price = parseInt(priceText.replace('💵 ', ''), 10); // Extract the numeric price

            // Check if the player has enough coins
            const playerCoins = getPlayerCoins();
            if (playerCoins >= price) {
                // Deduct the cost from player coins
                updatePlayerCoins(-price);

                // Get a new unique ID for this purchase
                const uniqueId = getNextId();

                // Define the item details
                const itemDetails = {
                    id: uniqueId, // Unique sequential ID
                    name: name,
                    description: description,
                    type: type, // Set type based on your item logic
                };

                // Add the new item to the inventory
                inventory.push(itemDetails);

                // Save the updated inventory
                saveInventory(inventory);
                console.log(inventory)

                // Optionally, add a feedback message to the user
                alert('Item purchased!');
            } else {
                // Inform the user they don't have enough coins
                alert('Not enough coins to purchase this item.');
            }
        }
    }
}

// Add event listener to the shop container for delegation
document.getElementById('shop-container').addEventListener('click', handleBuyButtonClick);
