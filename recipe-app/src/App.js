//Below we are importing React and the particular components
import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./recipe";

const App = () => {
  //Below is the Api APP ID
  const APP_ID = "a272cb90";
  //Below is the Api APP Key
  const APP_KEY = "46c243b9f14d596c640e929f4f153b8f";

  //Setting the state
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  //The below is a useEffect which is a react component. The Effect Hook lets you perform side effects when the app first runs. If you leave the second parameter empty it will only run once when the application starts. If you place a second parameter you will find the effect will run everytime that second paramter has changed.
  //This now runs when you update the search/input field and click search. Submitting a new query to the API
  useEffect(() => {
    getRecipes();
  }, [query]);

  //We will be using the below to run our api to get our recipes. The data returned will be converted to json format so its more readable.
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    //Setting the state with hits property from the object returned from the API
    setRecipes(data.hits);
    console.log(data.hits);
  };

  //This function is being used to update the search. We are getting the value from the input field from the search
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //This function takes in a event and sets the query state with what has been typed into the input field for the search
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    //Once the search has been ran we clear the search state which will clear the input field also
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          //Below we are displaying the recipe component and passing properties from this component down to the recipe component.
          //We see two recipes becuase the parameter in our map is recipe and than we have recipe in our object
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
