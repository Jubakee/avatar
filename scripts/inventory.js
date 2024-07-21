document.addEventListener('DOMContentLoaded', renderInventory);

function loadInventory() {
    let inventory = localStorage.getItem('avatar_inventory');
    if (inventory) {
        return JSON.parse(inventory);
    } else {
        return []; // Return an empty array if no inventory exists
    }
}

function renderInventory() {
    const inventory = loadInventory();
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear existing content

    if (inventory.length === 0) {
        inventoryList.innerHTML = '<li>No items in inventory</li>'; // Inform user if empty
        return;
    }

    inventory.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('inventory-item');

        let borderClass;
        switch (item.type) {
            case 'Normal':
                borderClass = 'border-chest'; // Class for normal chest
                break;
            case 'Rare':
                borderClass = 'border-rare-chest'; // Class for rare chest
                break;
            case 'Epic':
                borderClass = 'border-epic-chest'; // Class for epic chest
                break;
            default:
                borderClass = ''; // No border class if type is not recognized
        }

        listItem.classList.add(borderClass); // Add the border class
        listItem.textContent = `${item.name}: ${item.description}`; // Text-only display
        inventoryList.appendChild(listItem);
    });

    handlePagination(); // Call pagination function if needed
}

function handlePagination() {
    const inventoryList = document.getElementById('inventory-list');
    const itemsPerPage = 8;
    const items = inventoryList.getElementsByClassName('inventory-item');
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationControls = document.getElementById('pagination-controls');

    // Clear existing pagination controls
    paginationControls.innerHTML = '';

    // Create pagination controls
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => showPage(i));
        paginationControls.appendChild(button);
    }

    // Function to show a specific page
    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Hide all items
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
        }

        // Show items for the current page
        for (let i = startIndex; i < endIndex && i < items.length; i++) {
            items[i].style.display = 'block';
        }
    }

    // Show the first page by default
    showPage(1);
}
