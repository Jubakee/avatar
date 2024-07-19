function openChest() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const chestIndex = inventory.findIndex(item => item.name === 'Chest');

    if (chestIndex !== -1) {
        // Remove the Hat Chest from inventory
        inventory.splice(chestIndex, 1);

        // Select a random item from the items array
        const newItem = items[Math.floor(Math.random() * items.length)];
        //console.log(newItem.name, newItem.image, newItem.stats, newItem.type, newItem.borderColor, newItem.status);

        // Add the new item to the inventory
        inventory.push(newItem);
        localStorage.setItem('avatar_invetory', JSON.stringify(inventory));

        // Update the UI to show the new item
        displayInventory();
    }
}
