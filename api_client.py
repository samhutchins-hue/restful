import requests
import pandas as pd


BASE_URL = 'http://127.0.0.1:5000'


# Function to get all items
def get_items():
    response = requests.get(f'{BASE_URL}/items')
    if response.status_code == 200:
        items = response.json()
        print("Items retrieved successfully:")
        for item in items:
            print(f"ID: {item['id']}, Name: {item['name']}")
    else:
        print(f"Failed to retrieve items. Status code: {response.status_code}")


# Function to get a specific item
def get_item_by_id(item_id):
    response = requests.get(f'{BASE_URL}/items/{item_id}')
    if response.status_code == 200:
        item = response.json()
        print(f"Item retrieved successfully: ID: {item['id']}, Name: {item['name']}")
    else:
        print(f"Failed to retrieve item. Status code: {response.status_code}")
        print("Response message:", response.json().get('message'))


# Function to add a new item
def add_item(name):
    response = requests.post(f'{BASE_URL}/items', json={'name': name})
    if response.status_code == 201:
        item = response.json()
        print(f"Item added successfully: ID: {item['id']}, Name: {item['name']}")
    else:
        print(f"Failed to add item. Status code: {response.status_code}")


def generate_report():
    response = requests.get('http://127.0.0.1:5000/items')
    items = response.json()

    df = pd.DataFrame(items)
    df.to_csv('items_report.csv', index=False)
    print('Report generated: items_report.csv')


# Example usage
if __name__ == '__main__':
    # Add a new item
    add_item('Sample Item')

    # Retrieve and print all items
    get_items()

    # generate csv report
    generate_report()

    # retrieve items by id
    get_item_by_id(1)
    get_item_by_id(10)
