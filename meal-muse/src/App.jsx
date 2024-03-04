import { useState } from 'react'
import './App.css'
import Recipe from './Recipe'

function App() {
const apiKey = '185f2916834d40e3a619b916502d593c'
const [recipe, setRecipe] = useState(null)


function fetchRandomRecipes() {
  fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const recipeData = data.recipes[0]
      console.log(recipeData);
      setRecipe({
        title: recipeData.title,
        image: recipeData.image, 
        ingredients: recipeData.extendedIngredients.map(ing => {
          let amount = ing.measures.metric.amount || ing.amount;
          if (amount.toString().includes('.')) {
            const decimal = amount.toString().split('.')[1].length;
            if (amount <= 1 && decimal > 2) {
              amount = parseFloat(amount.toFixed(2));
            } else if (amount > 1) {
              amount = Math.round(amount);
            }
          }
          const unit = ing.measures.metric.unitLong
          const name = ing.name
          return `${amount} ${unit} ${name}`
        }),
        instructions: recipeData.instructions,
        readyInMinutes: recipeData.readyInMinutes
      })
    })
}

function handleClick(){
  fetchRandomRecipes()
}


  return (
    <>
      <div className="search-wrapper">
        <h1>Meal Generator</h1>
        <button onClick={handleClick}>Create</button>
      </div>

      <Recipe recipe={recipe}/>
    </>
  )
}

export default App
