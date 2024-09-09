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
// Async fetch and display the list of items
function fetchItems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Perform the GET request to fetch items
            const response = yield fetch('https://restful-z8tr.onrender.com/items', {
                method: 'GET', // Explicitly specify the GET method
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                // Handle HTTP errors (e.g., 404, 500)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            const data = yield response.json();
            // Get the items list container
            const itemsList = document.getElementById('items-list');
            if (itemsList) {
                itemsList.innerHTML = ''; // Clear existing items
                data.forEach(item => {
                    // Create and append item elements to the list
                    const itemElement = document.createElement('div');
                    itemElement.textContent = `ID: ${item.id}, Name: ${item.name}`;
                    itemsList.appendChild(itemElement);
                });
            }
        }
        catch (error) {
            // Handle any errors in fetching or processing
            console.error('Error fetching items:', error);
            displayError('Failed to fetch items. Please try again later.');
        }
    });
}
// Async add a new item
function addItem() {
    return __awaiter(this, void 0, void 0, function* () {
        const itemNameInput = document.getElementById('item-name');
        const itemName = itemNameInput === null || itemNameInput === void 0 ? void 0 : itemNameInput.value.trim();
        if (!itemName) {
            displayError('Please enter an item name.');
            return;
        }
        try {
            const response = yield fetch('https://restful-z8tr.onrender.com/items', {
                method: 'POST', // Correctly set the method to POST
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ name: itemName })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            alert(`Item successfully added: ${data.name}`);
            console.log('Item added:', data);
            yield fetchItems(); // Refresh the list
            itemNameInput.value = '';
            itemNameInput.focus();
        }
        catch (error) {
            console.error('Error adding item:', error);
            displayError('Failed to add item. Please try again later.');
        }
    });
}
function deleteItem() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the item ID from the input field
        const inputElement = document.getElementById('id-number');
        const itemId = parseInt(inputElement.value, 10);
        if (isNaN(itemId)) {
            displayError('Please enter a valid number.');
            return;
        }
        try {
            const response = yield fetch(`https://restful-z8tr.onrender.com/items/${itemId}`, {
                method: 'DELETE', // HTTP method for deletion
                headers: {
                    'Content-type': 'application/json', // good practice to specify
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert('Item successfully deleted');
            yield fetchItems();
            inputElement.value = '';
            inputElement.focus();
        }
        catch (error) {
            console.error('Error deleting item:', error);
            displayError('Failed to delete item. Please try again later.');
        }
    });
}
function displayError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    else {
        alert(message); // Fallback if error element is not found
    }
}
// Initialize the app by fetching items on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
});
