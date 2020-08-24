//This componenet will present the recipe, the properties will be passed down from the app.js which is using the API
import React from "react";
//Import the css style module for this component
import style from "./recipe.module.css";

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
      <p>{calories}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );
};

export default Recipe;
