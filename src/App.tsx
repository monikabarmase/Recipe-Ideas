import "./styles.css";
import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch meals from the API
  const fetchMeals = async () => {
    if (!ingredient) return; // Don't fetch if input is empty
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      if (response.data.meals) {
        setMeals(response.data.meals);
      } else {
        setMeals([]);
      }
    } catch (err) {
      setError("Oops! Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Quick Recipe Finder</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter an ingredient (e.g., chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button onClick={fetchMeals}>Find Recipes</button>
      </div>

      {/* Funny Joke */}
      <div className="joke-section">
        <p>
          <strong>Here's a quick joke to make you smile:</strong>
        </p>
        <p>
          "Why don't skeletons fight each other? Because they don't have the
          guts!"
        </p>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {meals.length > 0 ? (
        <div className="meal-list">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-item">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width="150"
                height="150"
              />
              <h3>{meal.strMeal}</h3>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No meals found with that ingredient.</p>
      )}
    </div>
  );
};

export default App;
