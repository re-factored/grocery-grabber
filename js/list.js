"use strict";

const itemList = document.getElementById('item-list');

let id = 0;


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
    const divEl = document.createElement('div');

    let cat = item.category;
    cat = cat.toLowerCase();
    cat = cat.replace(' ', '_')

    // const li = document.createElement('li');
    // li.textContent = `${item.category}: ${item.itemName}, ${item.quantity} ${item.ucm}`;

    divEl.innerHTML = `
          <div class="categoryCheckBox">
            <input type="checkbox" id="${cat}${id}">
            <label for="${cat}${id}">${item.quantity} ${item.ucm} - ${item.itemName} <span class="category ${cat}">${item.category} </span></label>
          </div>
        `;

    // itemList.appendChild(li);
    itemList.appendChild(divEl);
  });
}
displayItems();

const clearButton = document.getElementById("clear_list_button");

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  itemList.innerHTML = "";
  localStorage.removeItem("itemsList");
});