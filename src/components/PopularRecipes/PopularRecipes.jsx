import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import { getPopularRecipes } from 'api/recipes';
import s from './PopularRecipes.module.scss';

const PopularRecipesList = () => {
  const [popularRecipes, setPopularRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPopularRecipes();
        setIsLoading(false);
        setPopularRecipes(data);
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
      ) : popularRecipes && popularRecipes.length > 0 ? (
        <div className={s.popularRecipesContainer}>
          <h2 className={s.popularRecipesTitle}>POPULAR RECIPES</h2>
          <ul className={s.popularRecipeList}>
            {popularRecipes.map(recipe => (
              <li key={recipe._id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No recipes were found</div>
      )}
    </>
  );
};

export default PopularRecipesList;