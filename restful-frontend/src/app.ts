// Define the Item interface
interface Item {
  id: number;
  name: string;
}

// Define the ServerResponse interface for error handling
interface ServerResponse {
  message: string;
}

// Async fetch and display the list of items
async function fetchItems(): Promise<void> {
  try {
    // Perform the GET request to fetch items
    const response = await fetch('http://localhost:5000/items', {
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
    const data: Item[] = await response.json();

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
  } catch (error) {
    // Handle any errors in fetching or processing
    console.error('Error fetching items:', error);
    displayError('Failed to fetch items. Please try again later.');
  }
}

// Async add a new item
async function addItem(): Promise<void> {
  const itemNameInput = document.getElementById('item-name') as HTMLInputElement;
  const itemName = itemNameInput?.value.trim();

  if (!itemName) {
    displayError('Please enter an item name.');
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Item = await response.json();
    alert(`Item successfully added: ${data.name}`);
    console.log('Item added:', data);
    await fetchItems(); // Refresh the list

    itemNameInput.value = '';
    itemNameInput.focus();
  } catch (error) {
    console.error('Error adding item:', error);
    displayError('Failed to add item. Please try again later.');
  }
}

async function deleteItem(): Promise<void> {
  // Get the item ID from the input field
  const inputElement = document.getElementById('id-number') as HTMLInputElement;
  const itemId = parseInt(inputElement.value, 10);

  if (isNaN(itemId)) {
    displayError('Please enter a valid number.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/items/${itemId}`, {
      method: 'DELETE', // HTTP method for deletion
      headers: {
        'Content-type': 'application/json', // good practice to specify
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert('Item successfully deleted');
    await fetchItems();

    inputElement.value = '';
    inputElement.focus();
  } catch (error) {
    console.error('Error deleting item:', error);
    displayError('Failed to delete item. Please try again later.');
  }
}


function displayError(message: string): void {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  } else {
    alert(message); // Fallback if error element is not found
  }
}

// Initialize the app by fetching items on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchItems();
});
