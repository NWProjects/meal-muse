import './Recipe.css';
import { useState } from 'react';

export default function Recipe({ recipe }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const handleToggleIngredient = (ingredient) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter(item => item !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  }
  
  return (
    <div className="recipe">
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} onLoad={() => setImageLoaded(true)} />
          <h2>Ingredients</h2>
          <div className="ingredients">
            {recipe.ingredients.map((ing, idx) => (
              <div key={idx} className="ingredient">
                <input
                  type="checkbox"
                  checked={checkedIngredients.includes(ing)}
                  onChange={() => handleToggleIngredient(ing)}
                />
                <span
                  className={checkedIngredients.includes(ing) ? 'crossed-out' : ''}
                >
                  {ing}
                </span>
              </div>
            ))}
          </div>
          <h2>Instructions</h2>
          <div className='ins' dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          <h2>Cooking time</h2>
          <p>Ready in {recipe.readyInMinutes} minutes</p>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}
