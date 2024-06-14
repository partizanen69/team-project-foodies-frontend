// import react tools
import { useState, useEffect } from 'react';

// import components
import Container from 'components/Container/Container';
import NavigationButton from './NavigationButton/NavigationButton';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';

// import requests
import { getRecipes } from 'api/recipes';

// import styles
import s from './Recipes.module.scss';

const Recipes = () => {
  const [recipesList, setRecipesList] = useState([]);
  const [page, setPage] = useState(null)
  const [total, setTotal] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getRecipes();
        setIsLoading(false);
        setRecipesList(data.recipes);
        setPage(data.page)
        setTotal(data.total)
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, []);

  return (
    <Container className={s.recipes_container}>
      <div className={s.recipes_header_container}>
        <NavigationButton title="back"></NavigationButton>
        <MainTitle>desserts</MainTitle>
        <Subtitle>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>
      <RecipeList recipesList={recipesList} isLoading={isLoading} errorMsg={errorMsg}/>
      <RecipePagination page={page} total={total}/>
    </Container>
  );
};

export default Recipes;
