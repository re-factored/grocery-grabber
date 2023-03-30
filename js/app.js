"use strict";

// Loads HTML before JS
document.addEventListener('DOMContentLoaded', () => {

    // Dropdown for categories
    function populateCategory() {
        let categories = ["Fruit", "Vegetable", "Canned Goods", "Meat", "Seafood", "Deli", "Bakery", "Frozen Foods", "Personal Care", "Pet"];
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
        for (let i = 0; i < measurementOptions.length; i++) {
            let optionElMeasurement = document.createElement("option");
            optionElMeasurement.textContent = measurementOptions[i];
            measurementEl.appendChild(optionElMeasurement);
        }
    }
    populateMeasurement();

    let state = getFromLocalStorage("itemsList") ? JSON.parse(getFromLocalStorage("itemsList")) : [];

    function getFromLocalStorage() {
        return localStorage.getItem("itemsList");
    }

    // constructor function for the state object
    const Item = function (category, itemName, quantity, ucm, isAdded = false) {
        this.category = category;
        this.itemName = itemName;
        this.quantity = quantity;
        this.ucm = ucm;
        this.isAdded = isAdded;
    }

    //Save items to local storage
    function saveToLocalStorage() {
        localStorage.setItem("itemsList", JSON.stringify(state));
    }

    //Add item and sort them by category
    function addItem() {
        const category = document.getElementById("category").value;
        const itemName = document.getElementById("item_name").value;
        const quantity = document.getElementById("quantity").value;
        const ucm = document.getElementById("measurement").value;

        const newItem = new Item(category, itemName, quantity, ucm);

        localStorage.setItem("itemsList", JSON.stringify(state));
        state.push(newItem);
    }

    //Get Elements By Id 
    const categoryInput = document.getElementById('category');
    const itemNameInput = document.getElementById('item_name');
    const quantityInput = document.getElementById('quantity');
    const ucmInput = document.getElementById('measurement');
    const addItemButton = document.getElementById('add_item_button');
    const cancelButton = document.getElementById('cancel-button');
    const clearButton = document.getElementById("clear-recipes");
    const recipeList = document.getElementById("recipe-list");


    addItemButton.addEventListener("click", (event) => {
        event.preventDefault()
        const newItem = new Item(categoryInput.value, itemNameInput.value, quantityInput.value, ucmInput.value);
        state.push(newItem);

        categoryInput.value = "";
        itemNameInput.value = "";
        quantityInput.value = "";
        ucmInput.value = "";

        saveToLocalStorage();

    });

    const groceryForm = document.getElementById('grocery-form');

    groceryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newItem = new Item(categoryInput.value, itemNameInput.value, quantityInput.value, ucmInput.value);
        state.push(newItem);

        categoryInput.value = "";
        itemNameInput.value = "";
        quantityInput.value = "";
        ucmInput.value = "";

        saveToLocalStorage();

    });

    cancelButton.addEventListener("click", () => {
        window.location.href= './grocery-list.html';
    });

});