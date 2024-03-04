import './Recipe.css'

export default function Recipe({recipe}){
    return(
        <div className="recipe">
        {recipe ? (
          <>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ing, idx) => (
                <li className="ing" key={idx}>{ing}</li>
              ))}
            </ul>
            <h2>Instructions</h2>
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            <h2>Cooking time</h2>
            <p>Ready in {recipe.readyInMinutes} minutes</p>
          </>
        ) : (
          <p></p>
        )}
        </div>
    )
}