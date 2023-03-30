"use strict";

const Item = function (category, itemName, quantity, ucm, isAdded = false) {
  this.category = category;
  this.itemName = itemName;
  this.quantity = quantity;
  this.ucm = ucm;
  this.isAdded = isAdded;
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("form submitting");
}

function checkFields() {
  // return ture or false
  const category = capitalize(document.getElementById("category").value);
  const ingredient = capitalize(document.getElementById("ingredient-input").value);
  const quantity = document.getElementById("quantity-input").value;
  const unit = document.getElementById("unit-input").value;

  return (category === "" || ingredient === "" || quantity === "" || unit === "");

}

function addIngredient() {
  if (checkFields()) {
    return;
  }
  const ingredientTable = document.getElementById("ingredient-table").getElementsByTagName("tbody")[0];
  let currentPortionSize = document.getElementById('current-portion-size').value;
  let desiredPortionSize = document.getElementById('desired-portion-size').value;

  const category = capitalize(document.getElementById("category").value);
  const ingredient = capitalize(document.getElementById("ingredient-input").value);
  let quantity = document.getElementById("quantity-input").value;
  const unit = document.getElementById("unit-input").value;

  let newPortion = desiredPortionSize / currentPortionSize;
  if (currentPortionSize !== desiredPortionSize) {

    // let ingredientPortioned = quantity * newPortion;
    quantity = quantity * newPortion;
  } else {
    quantity = quantity * 1;
  }

  const newRow = ingredientTable.insertRow();
  const categoryCell = newRow.insertCell(0);
  const ingredientCell = newRow.insertCell(1);
  const quantityCell = newRow.insertCell(2);
  const unitCell = newRow.insertCell(3);
  const removeCell = newRow.insertCell(4);

  categoryCell.textContent = category;
  ingredientCell.textContent = ingredient;
  quantityCell.textContent = quantity;
  unitCell.textContent = unit;
  removeCell.innerHTML = '<button onclick="removeIngredient(this)"><i class="fa-solid fa-xmark" style="color: #D60A0A;"></i></button>';

  document.getElementById("category").selectedIndex = 0;
  document.getElementById("ingredient-input").value = "";
  document.getElementById("quantity-input").value = "";
  document.getElementById("unit-input").value = "g";

};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeIngredient(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function removeTest(itemName) {
  console.log("name --- ", itemName);
  let storedItems = JSON.parse(localStorage.getItem("itemsList"));
  storedItems = storedItems.filter((item) => item.itemName !== itemName);
  localStorage.setItem("itemsList", JSON.stringify(storedItems));
  renderShoppingList();
}



function renderRecipeList() {
  let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

  const recipeTable = document.getElementById("recipe-name-table").getElementsByTagName("tbody")[0];
  recipeTable.innerHTML = "";

  storedRecipes.forEach(recipe => {
    addRecipeNameToTable(recipe.name);
  });
}
renderRecipeList();

function renderShoppingList() {
  // pull itemsList / parse/
  const storedItems = JSON.parse(localStorage.getItem("itemsList")) || [];


  const ingredientTable = document.getElementById("selected-recipe-ingredients").getElementsByTagName("tbody")[0];
  ingredientTable.innerHTML = "";

  storedItems.forEach(ingredient => {
    const newRow = ingredientTable.insertRow();
    const categoryCell = newRow.insertCell(0);
    const ingredientCell = newRow.insertCell(1);
    const quantityCell = newRow.insertCell(2);
    const unitCell = newRow.insertCell(3);
    const removeCell = newRow.insertCell(4); // Add this line

    categoryCell.textContent = ingredient.category;
    ingredientCell.textContent = ingredient.itemName;
    quantityCell.textContent = ingredient.quantity;
    unitCell.textContent = ingredient.unit;
    removeCell.innerHTML = `<button onclick="removeTest('${ingredient.itemName}')"><i class="fa-solid fa-xmark" style="color: #D60A0A;"></i></button>`; // Add this line
  });
}
renderShoppingList();

function addRecipeNameToTable(recipeName) {
  const recipeNameTable = document.getElementById("recipe-name-table").getElementsByTagName("tbody")[0];
  const newRow = recipeNameTable.insertRow();
  const nameCell = newRow.insertCell(0);
  const addButtonCell = newRow.insertCell(1);
  const removeButtonCell = newRow.insertCell(2);

  nameCell.textContent = recipeName;
  addButtonCell.innerHTML = '<button onclick="addRecipe(this)">Add</button>';
  removeButtonCell.innerHTML = '<button onclick="removeRecipe(this)">Remove</button>';
}

function addRecipe(button) {
  const row = button.parentNode.parentNode;
  const recipeName = row.cells[0].textContent;


  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const selectedRecipe = recipes.find(recipe => recipe.name === recipeName);
  const ingredients = selectedRecipe.ingredients;

  console.log("ingreeeed", ingredients);

  const storedItems = JSON.parse(localStorage.getItem("itemsList")) || [];

  ingredients.forEach(ingredient => {
    let newIngredient = new Item(ingredient.category, ingredient.ingredientName, ingredient.quantity, ingredient.unit);

    console.log("new-----", newIngredient);
    // update items array
    storedItems.push(newIngredient);
  });

  // stringify and put back in local storage
  localStorage.setItem("itemsList", JSON.stringify(storedItems));
  renderShoppingList();
}

// Capitalize first letter
function saveRecipeToLocalStorage(recipe) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function removeRecipe(button) {
  const row = button.parentNode.parentNode;
  const recipeName = row.cells[0].textContent;

  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const updatedRecipes = recipes.filter(recipe => recipe.name !== recipeName);
  localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

  row.parentNode.removeChild(row);
}

function submitRecipe(event) {
  event.preventDefault(); // Prevent the form from submitting
  console.log("ljkhasdf");
  const recipeName = document.getElementById("recipe-name").value;

  const ingredients = Array.from(document.getElementById("ingredient-table").getElementsByTagName("tbody")[0].rows).map(row => {
    return {
      category: row.cells[0].textContent,
      ingredientName: row.cells[1].textContent,
      quantity: row.cells[2].textContent,
      unit: row.cells[3].textContent,
    };
  });

  const recipe = {
    name: recipeName,
    ingredients: ingredients,
  };

  saveRecipeToLocalStorage(recipe);
  addRecipeNameToTable(recipeName);

  document.getElementById("recipe-name").value = "";
  document.getElementById("ingredient-table").getElementsByTagName("tbody")[0].innerHTML = "";
}

function getFromLocalStorage() {
  return localStorage.getItem("itemsList");
}

function saveToLocalStorage(itemsArray) {
  localStorage.setItem("itemsList", JSON.stringify(itemsArray));
}

function addShoppingIngredient() {
  const storedItems = JSON.parse(getFromLocalStorage());
  console.log(storedItems);
  const shoppingIngredientTable = document.getElementById("selected-recipe-ingredients").getElementsByTagName("tbody")[0];

  const category = capitalize(document.getElementById("shopping-category").value);
  const itemName = capitalize(document.getElementById("shopping-ingredient-input").value);
  const quantity = document.getElementById("shopping-quantity-input").value;
  const ucm = document.getElementById("shopping-unit-input").value;

  let newIngredient = new Item(category, itemName, quantity, ucm);
  storedItems.push(newIngredient);
  saveToLocalStorage(storedItems);

  const newRow = shoppingIngredientTable.insertRow();
  const categoryCell = newRow.insertCell(0);
  const ingredientCell = newRow.insertCell(1);
  const quantityCell = newRow.insertCell(2);
  const unitCell = newRow.insertCell(3);
  const removeCell = newRow.insertCell(4);

  categoryCell.textContent = category;
  ingredientCell.textContent = itemName;
  quantityCell.textContent = quantity;
  unitCell.textContent = ucm;
  removeCell.innerHTML = '<button onclick="removeIngredient(this)"><i class="fa-solid fa-xmark" style="color: #D60A0A;"></i></button>';

  document.getElementById("shopping-category").selectedIndex = 0;
  document.getElementById("shopping-ingredient-input").value = "";
  document.getElementById("shopping-quantity-input").value = "";
  document.getElementById("shopping-unit-input").value = "g";
}