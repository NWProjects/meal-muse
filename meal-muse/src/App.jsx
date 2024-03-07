import { useState } from 'react'
import './App.css'
import Recipe from './Recipe'
import { useEffect } from 'react'

function App() {
const apiKey = import.meta.env.VITE_API_KEY
const [recipe, setRecipe] = useState(null)
const [cuisine, setCuisine] = useState('all')
const [diet, setDiet] = useState('all')


useEffect(() => {
  fetchRandomRecipes(cuisine, diet);
}, [cuisine, diet]) 

function fetchRandomRecipes(cuisine, diet) {
  let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;

  if (cuisine !== 'all' || diet !== 'all') {
    url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&include-tags=`;

    if (cuisine !== 'all' && diet === 'all') {
      url += `${cuisine}`;
    } else if (cuisine === 'all' && diet !== 'all') {
      if (diet === 'vegetarian') {
        url += `${cuisine},${diet}`;
      } else {
        url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&exclude-tags=`;
        url += `${diet}`;
      }
    } else {
      if (diet === 'vegetarian') {
        url += `${cuisine},${diet}`;
      } else {
        url += `${cuisine}&exclude-tags=${diet}`;
      }
    }
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data && data.recipes && data.recipes.length > 0) {
        const recipeData = data.recipes[0];
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
                amount = Math.round(amount)
              }
            }
            const unit = ing.measures.metric.unitLong || "";
            const name = ing.name || "";
            return `${amount} ${unit} ${name}`;
          }),
          instructions: recipeData.instructions || "",
          readyInMinutes: recipeData.readyInMinutes || 0
        });
      } else {
        console.error("No recipe data found in the response");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


function handleSubmit(event) {
  event.preventDefault();
  const selectedCuisine = document.getElementById('cuisines').value;
  const selectedDiet = document.getElementById('diets').value;
  setCuisine(selectedCuisine);
  setDiet(selectedDiet);
  fetchRandomRecipes(selectedCuisine, selectedDiet);
}

function refreshPage() {
  fetchRandomRecipes(cuisine, diet)
}

  return (
    <>
      <div className="search-wrapper">
        <h1>Meal Muse</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="cuisines">Cuisine:</label>
          <select name="cuisines" id="cuisines">
            <option value="all">--</option>
            <option value="african">African</option>
            <option value="asian">Asian</option>
            <option value="american">American</option>
            <option value="british">British</option>
            <option value="cajun">Cajun</option>
            <option value="caribbean">Caribbean</option>
            <option value="chinese">Chinese</option>
            <option value="eastern_european">Eastern European</option>
            <option value="european">European</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="greek">Greek</option>
            <option value="indian">Indian</option>
            <option value="irish">Irish</option>
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="jewish">Jewish</option>
            <option value="korean">Korean</option>
            <option value="latin_american">Latin American</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="middle_eastern">Middle Eastern</option>
            <option value="nordic">Nordic</option>
            <option value="southern">Southern</option>
            <option value="spanish">Spanish</option>
            <option value="thai">Thai</option>
            <option value="vietnamese">Vietnamese</option>
          </select>

          <label htmlFor="diets">Diet:</label>
          <select name="diets" id="diets">
            <option value="all">--</option>
            <option value="dairy">Dairy free</option>
            <option value="gluten">Gluten free</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
          <br />
          <input type="submit" value="Create" />
        </form>
      </div>

      <div>
    
    </div>

      <Recipe recipe={recipe} refreshPage={refreshPage}/>
    </>
  )
}

export default App
