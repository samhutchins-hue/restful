// Fetch and display the list of items
function fetchItems() {
    fetch('http://localhost:5000/items')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var itemsList = document.getElementById('items-list');
        if (itemsList) {
            itemsList.innerHTML = ''; // Clear existing items
            data.forEach(function (item) {
                var itemElement = document.createElement('div');
                itemElement.textContent = "ID: ".concat(item.id, ", Name: ").concat(item.name);
                itemsList.appendChild(itemElement);
            });
        }
    })
        .catch(function (error) { return console.error('Error fetching items:', error); });
}
// Add a new item
function addItem() {
    var itemNameInput = document.getElementById('item-name');
    var itemName = itemNameInput === null || itemNameInput === void 0 ? void 0 : itemNameInput.value.trim();
    if (!itemName) {
        alert('Please enter an item name.');
        return;
    }
    fetch('http://localhost:5000/items', {
        method: 'POST', // Correctly set the method to POST
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name: itemName })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Item added:', data);
        fetchItems(); // Refresh the list
    })
        .catch(function (error) { return console.error('Error adding item:', error); });
}
// Initialize the app by fetching items on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchItems();
});
