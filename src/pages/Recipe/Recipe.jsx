import { React, useEffect, useState } from 'react';
import Container from 'components/Container/Container';
import { PathInfo } from '../../components/PathInfo/PathInfo';
import { RecipeInfo } from './RecipeInfo/RecipeInfo';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';
import { getRecipeById } from '../../api/recipes';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import s from './Recipe.module.scss';
import Footer from 'components/Footer/Footer';

const Recipe = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
            <RecipeInfo recipe={recipe} />
          </div>
          <PopularRecipes />
        </div>
      )}
      <Footer />
    </Container>
  );
};

Recipe.propTypes = {};

export default Recipe;
