// import react tools
import { useState, useEffect } from 'react';

// import components
import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import Loader from 'components/Loader/Loader';

// import requests
import { getRecipes } from 'api/recipes';

// import styles
import s from './RecipeList.module.scss';

const RecipeList = () => {
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getRecipes();
        setIsLoading(false);
        setRecipesList(data.recipes);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <div>{errorMsg}</div>
      ) : recipesList && recipesList.length > 0 ? (
        <ul className={s.recipes_list}>
          {recipesList.map(recipe => (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No recipes were found</div>
      )}
    </>
  );
};

export default RecipeList;
