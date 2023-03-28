"use strict";

const itemList = document.getElementById('item-list');

function getFromLocalStorage() {
    return localStorage.getItem("itemsList");
}

// Displays stored items on list
function displayItems() {
    // Clear the existing list items
    itemList.innerHTML = '';
    const storedItems = JSON.parse(getFromLocalStorage());

    // Sort the state array by category
    storedItems.sort((a, b) => (a.category > b.category) ? 1 : -1);

    // Loop through the state array and create a new list item for each item
    storedItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.category}: ${item.itemName}, ${item.quantity} ${item.ucm}`;
        itemList.appendChild(li);
    });
}
displayItems();

const clearButton = document.getElementById("clear_list_button");

clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    itemList.innerHTML = "";
})