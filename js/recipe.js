function capitalize(str) {
    return str.replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
  }

  function removeIngredient(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }

  function saveRecipeToLocalStorage(recipe) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }

  document.getElementById("add-ingredient").addEventListener("click", function (event) {
    event.preventDefault();
    const ingredientTable = document.getElementById("ingredient-table").getElementsByTagName("tbody")[0];

    const category = capitalize(document.getElementById("category").value);
    const ingredient = capitalize(document.getElementById("ingredient-input").value);
    const quantity = document.getElementById("quantity-input").value;
    const unit = document.getElementById("unit-input").value;

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
    removeCell.innerHTML = '<button onclick="removeIngredient(this)">X</button>';


    document.getElementById("category").selectedIndex = 0;
    document.getElementById("ingredient-input").value = "";
    document.getElementById("quantity-input").value = "";
    document.getElementById("unit-input").value = "g";
  });

  document.getElementById("recipe-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const recipeName = capitalize(document.getElementById("recipe-name").value);
    const ingredientTable = document.getElementById("ingredient-table");
    const ingredients = [];

    for (const row of ingredientTable.rows) {
      if (row.rowIndex === 0) continue; 

      ingredients.push({
        category: row.cells[0].textContent,
        ingredientName: row.cells[1].textContent, 
        quantity: row.cells[2].textContent,
        unit: row.cells[3].textContent,
      });
    }

    const recipe = {
      name: recipeName,
      ingredients: ingredients,
    };

    saveRecipeToLocalStorage(recipe);

    document.getElementById("recipe-name").value = "";
    while (ingredientTable.rows.length > 1) {
      ingredientTable.deleteRow(1);
    }
  });
  function displayRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
    // Clear existing list of recipes
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";
  
    // Loop through saved recipes and create a new list item for each
    savedRecipes.forEach(recipe => {
      const recipeName = document.createElement("h3");
      recipeName.textContent = recipe.name;
      recipeList.appendChild(recipeName);
  
      const ingredientList = document.createElement("ul");
      recipe.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = `${ingredient.category}: ${ingredient.ingredientName} - ${ingredient.quantity} ${ingredient.unit}`;
        ingredientList.appendChild(ingredientItem);
      });
      recipeList.appendChild(ingredientList);
    });
  }
  
  // Call the function to display saved recipes on page load
  displayRecipes();