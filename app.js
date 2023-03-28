"use strict"

// Dropdown for categories
function populateCategory() {
    let categories = ["Fruit", "Vegetable", "Canned Goods", "Meat", "Seafood", "Deli", "Bakery", "Frozen Foods", "Fersonal Care", "Pet"];
    const foodCategory = document.getElementById("category");
    for (let i = 0; i < categories.length; i++) {
        let optionEl = document.createElement("option");
        optionEl.textContent = categories[i];
        foodCategory.appendChild(optionEl);
    }
}
populateCategory();


// Dropdown for measurements
function populateMeasurement() {
    let measurementOptions = ["ml", "tsp", "tbsp", "cup", "pcs"];
    const measurementEl = document.getElementById("measurement");
    for(let i = 0; i < measurementOptions.length; i++) {
        let optionElMeasurement = document.createElement("option");
        optionElMeasurement.textContent = measurementOptions[i];
        measurementEl.appendChild(optionElMeasurement);
    }
}
populateMeasurement();

let state = [];

// constructor function for the state object
const itemsList = function(category, itemName, quantity, ucm) {
    this.category = category;
    this.itemName = itemName;
    this.quantity = quantity;
    this.ucm = ucm;
}

// Save items to local storage
itemsList.prototype.saveToLocalStorage = function() {
    localStorage.setItem("itemsList", JSON.stringify(this.itemName));
    localStorage.setItem("itemsListQuantity", JSON.stringify(this.quantity));
}

function addItem() {
    const category = document.getElementById("category").value;
    const itemName = document.getElementById("item-name").value;
    const quantity = document.getElementById("quantity").value;
    const ucm = document.getElementById("ucm").value;

    const newItem = new itemsList(category, itemName, quantity, ucm);

    state.sort((a, b) => (a.category > b.category) ? 1 : -1);

    localStorage.setItem("state", JSON.stringify(state));
}

itemsList.prototype.saveToLocalStorage = function() {
    localStorage.setItem("state", JSON.stringify(state));
}

const categoryInput = document.getElementById('category');
const itemNameInput = document.getElementById('item_name');
const quantityInput = document.getElementById('quantity');
const ucmInput = document.getElementById('measurement');
const addItemButton = document.getElementById('add_item_button');
const itemList = document.getElementById('item-list');

addItemButton.addEventListener("click", () => {
    const newItem = new itemsList(categoryInput.value, itemNameInput.value, quantityInput.value, ucmInput.value);

    state.push(newItem);

    categoryInput.value = "";
    itemNameInput.value = "";
    quantityInput.value = "";
    ucmInput.value = "";

    displayItems();
});

function displayItems() {
    // Clear the existing list items
    itemList.innerHTML = '';
  
    // Sort the state array by category
    state.sort((a, b) => (a.category > b.category) ? 1 : -1);
  
    // Loop through the state array and create a new list item for each item
    state.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.category}: ${item.itemName}, ${item.quantity} ${item.ucm}`;
      itemList.appendChild(li);
    });
  }