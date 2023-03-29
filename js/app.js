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
        console.log(measurementEl);
        for (let i = 0; i < measurementOptions.length; i++) {
            let optionElMeasurement = document.createElement("option");
            optionElMeasurement.textContent = measurementOptions[i];
            measurementEl.appendChild(optionElMeasurement);
        }
    }
    populateMeasurement();

    let state = getFromLocalStorage() ? JSON.parse(getFromLocalStorage()) : [];

    function getFromLocalStorage() {
        return localStorage.getItem("itemsList");
    }

    // constructor function for the state object
    const Item = function (category, itemName, quantity, ucm) {
        this.category = category;
        this.itemName = itemName;
        this.quantity = quantity;
        this.ucm = ucm;
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

        state.sort((a, b) => (a.category > b.category) ? 1 : -1);

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
    clearButton.addEventListener("click", clearRecipes);
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // clears the contents of the recipe list

   

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
  window.history.back();
});


function clearRecipes() {
    const recipeList = document.getElementById("recipe-list");
    while (recipeList.firstChild) {
      recipeList.removeChild(recipeList.firstChild);
    }
  }





function scaleRecipe(recipeName, multiplier) {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipe = savedRecipes.find(r => r.name === recipeName);
    
    if (recipe) {
      const scaledIngredients = recipe.ingredients.map(ingredient => ({
        ...ingredient,
        quantity: (parseFloat(ingredient.quantity) * multiplier).toFixed(2)
      }));
      
      const scaledRecipe = {
        name: recipe.name + " x " + multiplier,
        ingredients: scaledIngredients
      };
      
      saveRecipeToLocalStorage(scaledRecipe);
      
      // Call the displayRecipes function to update the displayed recipe list
      displayRecipes();
      
      return scaledRecipe;
    } else {
      console.log("Recipe not found.");
    }
  }    

});