// Define the Item interface
interface Item {
  id: number;
  name: string;
}

// Define the ServerResponse interface for error handling
interface ServerResponse {
  message: string;
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

// Async add a new item
async function addItem(): Promise<void> {
  const itemNameInput = document.getElementById('item-name') as HTMLInputElement;
  const itemName = itemNameInput?.value.trim();
  if (!itemName) {
    alert('Please enter an item name.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/items', {
      method: 'POST', // Correctly set the method to POST
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name: itemName})
    });

    if (!response.ok) {
      const errorData: ServerResponse = await response.json();
      alert(`Error: ${errorData.message}`);
      throw new Error(errorData.message);
    }

    const data: Item = await response.json();
    console.log('Item added:', data);
    fetchItems(); // Refresh the list
  } catch (error) {
    console.error('Error adding item:', error);
    alert('Failed to add item');
  }
}

async function deleteItem(): Promise<void> {
  // Get the item ID from the input field
  const inputElement = document.getElementById('id-number') as HTMLInputElement;
  const itemId = parseInt(inputElement.value, 10);

  if (isNaN(itemId)) {
    alert('Please enter a valid number.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/items/${itemId}', {
      method: 'DELETE', // HTTP method for deletion
      headers: {
        'Content-type': 'application/json', // good practice to specify
      },
    });

    if (!response.ok) {
      // Check if the response status is not in the 2xx range
      const errorData: ServerResponse = await response.json();
      alert(`Error: ${errorData.message}`);
      throw new Error(errorData.message);
    }

    alert('Item successfully deleted');
    fetchItems();
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to delete item');
  }
}

// Initialize the app by fetching items on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchItems();
});
