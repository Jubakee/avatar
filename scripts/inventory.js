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
                borderClass = 'border-normal-chest'; // Class for normal chest
                break;
            case 'Magic':
                borderClass = 'border-magic-chest'; // Class for rare chest
                break;
            case 'Rare':
                borderClass = 'border-rare-chest'; // Class for epic chest
                break;
            case 'Epic':
                borderClass = 'border-epic-chest'; // Class for normal chest
                 break;
            case 'Unique':
                borderClass = 'border-unique-chest'; // Class for rare chest
                break;
            case 'Legendary':
                borderClass = 'border-legendary-chest'; // Class for epic chest
                break;
                    
            default:
                borderClass = ''; // No border class if type is not recognized
        }

        listItem.classList.add(borderClass); // Add the border class

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.classList.add('item-image');

        const itemText = document.createElement('span');
        itemText.textContent = `${item.description}`; //${item.name}: 
        itemText.classList.add('item-text');

        listItem.appendChild(itemImage);
        listItem.appendChild(itemText);
        inventoryList.appendChild(listItem);
    });

    handlePagination(); // Call pagination function if needed
}


function handlePagination() {
    const inventoryList = document.getElementById('inventory-list');
    const itemsPerPage = 6;
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
