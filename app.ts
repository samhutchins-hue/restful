// Define the Item interface
interface Item {
  id: number;
  name: string;
}

// Fetch and display the list of items
function fetchItems(): void {
  fetch('http://localhost:5000/items')
    .then(response => response.json())
    .then((data: Item[]) => {
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

// Add a new item
function addItem(): void {
  const itemNameInput = document.getElementById('item-name') as HTMLInputElement;
  const itemName = itemNameInput?.value.trim();
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
    .then(response => response.json())
    .then((data : Item) => {
      console.log('Item added:', data);
      fetchItems(); // Refresh the list
    })
    .catch(error => console.error('Error adding item:', error));
}

// Initialize the app by fetching items on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchItems();
});
