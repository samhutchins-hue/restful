"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fetch and display the list of items
function fetchItems() {
    fetch('http://localhost:5000/items')
        .then(response => response.json())
        .then((data) => {
        const itemsList = document.getElementById('items-list');
        if (itemsList) {
            itemsList.innerHTML = ''; // Clear existing items
            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.textContent = `ID: ${item.id}, Name: ${item.name}`;
                itemsList.appendChild(itemElement);
            });
        }
    })
        .catch(error => console.error('Error fetching items:', error));
}
// Async add a new item
function addItem() {
    return __awaiter(this, void 0, void 0, function* () {
        const itemNameInput = document.getElementById('item-name');
        const itemName = itemNameInput === null || itemNameInput === void 0 ? void 0 : itemNameInput.value.trim();
        if (!itemName) {
            alert('Please enter an item name.');
            return;
        }
        try {
            const response = yield fetch('http://localhost:5000/items', {
                method: 'POST', // Correctly set the method to POST
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ name: itemName })
            });
            if (!response.ok) {
                const errorData = yield response.json();
                alert(`Error: ${errorData.message}`);
                throw new Error(errorData.message);
            }
            const data = yield response.json();
            console.log('Item added:', data);
            fetchItems(); // Refresh the list
        }
        catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item');
        }
    });
}
function deleteItem() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the item ID from the input field
        const inputElement = document.getElementById('id-number');
        const itemId = parseInt(inputElement.value, 10);
        if (isNaN(itemId)) {
            alert('Please enter a valid number.');
            return;
        }
        try {
            const response = yield fetch('http://localhost:5000/items/${itemId}', {
                method: 'DELETE', // HTTP method for deletion
                headers: {
                    'Content-type': 'application/json', // good practice to specify
                },
            });
            if (!response.ok) {
                // Check if the response status is not in the 2xx range
                const errorData = yield response.json();
                alert(`Error: ${errorData.message}`);
                throw new Error(errorData.message);
            }
            alert('Item successfully deleted');
            fetchItems();
        }
        catch (error) {
            console.error('Error:', error);
            alert('Failed to delete item');
        }
    });
}
// Initialize the app by fetching items on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
});
