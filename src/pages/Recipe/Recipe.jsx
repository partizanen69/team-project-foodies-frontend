import { React, useEffect, useState } from 'react';
import Container from 'components/Container/Container';
import { PathInfo } from '../../components/PathInfo/PathInfo';
import { RecipeInfo } from './RecipeInfo/RecipeInfo';
import { PopularRecipes } from './PopularRecipes/PopularRecipes';
import { getFavoriteRecipes, getRecipeById } from '../../api/recipes';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import s from './Recipe.module.scss';

const Recipe = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const recipe = await getRecipeById({ id });
        setIsLoading(false);
        setRecipe(recipe);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!recipe) {
      return;
    }

    setIsLoading(true);

    (async () => {
      try {
        const favoriteRecipes = await getFavoriteRecipes({
          recipeIds: [recipe._id],
        });
        setIsFavorite(favoriteRecipes.recipes.includes(recipe._id));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [recipe]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <div>{errorMsg}</div>
      ) : (
        <div className={s.recipe_content}>
          <div>
            <PathInfo currentPageName={recipe.title} />
            <RecipeInfo isFavorite={isFavorite} recipe={recipe} />
          </div>
          <PopularRecipes />
        </div>
      )}
    </Container>
  );
};

Recipe.propTypes = {};

export default Recipe;
