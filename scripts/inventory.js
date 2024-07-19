function loadInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear existing items

    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const totalPages = Math.ceil(inventory.length / itemsPerPage); // Calculate total pages

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, inventory.length);

    for (let i = startIndex; i < endIndex; i++) {
        const item = inventory[i];
        const li = document.createElement('li');
        li.className = 'inventory-item';
        li.style.borderColor = item.rarity; // Set the border color
        li.style.borderWidth = '5px'; // Optional: Set the border width
        li.style.borderStyle = 'solid'; // Optional: Set the border style
        li.style.padding = '10px'; // Optional: Inner spacing
        li.style.margin = '5px'; // Optional: Spacing between items
        li.style.borderRadius = '5px'; // Optional: Rounded corners
        
        li.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="inventory-item-image" />
            <div class="inventory-item-title">${item.title}</div>
            <div class="inventory-item-description">${item.description}</div>
        `;

        inventoryList.appendChild(li);
    }

    // Display pagination controls
    displayPagination(totalPages);
}


function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination-controls');
    pagination.innerHTML = ''; // Clear existing pagination controls

    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = currentPage === 1; // Disable if on the first page
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayInventory(); // Refresh the inventory display
        }
    };
    pagination.appendChild(prevButton);

    // Page indicator
    const pageIndicator = document.createElement('span');
    pageIndicator.innerText = ` ${currentPage} / ${totalPages} `;
    pagination.appendChild(pageIndicator);

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.disabled = currentPage === totalPages; // Disable if on the last page
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayInventory(); // Refresh the inventory display
        }
    };
    pagination.appendChild(nextButton);
}