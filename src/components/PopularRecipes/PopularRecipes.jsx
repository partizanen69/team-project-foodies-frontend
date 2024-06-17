import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import { getFavoriteRecipes, getPopularRecipes } from 'api/recipes';
import s from './PopularRecipes.module.scss';
import Container from 'components/Container/Container';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/selectors';

const PopularRecipes = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [popularRecipes, setPopularRecipes] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const popularRecipes = await getPopularRecipes();
        const limitedPopular = popularRecipes.slice(0, 4);
        if (currentUser) {
          const { recipes } = await getFavoriteRecipes({
            recipeIds: limitedPopular.map(r => r._id),
          });
          setFavoriteRecipes(recipes);
        }

        setIsLoading(false);
        setPopularRecipes(limitedPopular);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [currentUser]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <div>{errorMsg}</div>
      ) : popularRecipes && popularRecipes.length > 0 ? (
        <Container className={s.popularRecipesContainer}>
          <h2 className={s.popularRecipesTitle}>POPULAR RECIPES</h2>
          <ul className={s.popularRecipeList}>
            {popularRecipes.map(recipe => (
              <li key={recipe._id}>
                <RecipeCard
                  recipe={recipe}
                  favoriteRecipes={favoriteRecipes}
                  setFavoriteRecipes={setFavoriteRecipes}
                />
              </li>
            ))}
          </ul>
        </Container>
      ) : (
        <div>No recipes were found</div>
      )}
    </>
  );
};

export default PopularRecipes;
