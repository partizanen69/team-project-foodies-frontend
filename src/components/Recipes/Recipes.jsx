// import react tools
import { useState, useEffect } from 'react';

// import components
import Container from 'components/Container/Container';
import NavigationButton from './NavigationButton/NavigationButton';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';
import RecipeFilters from './RecipeFilters';

// import requests
import { getRecipes } from 'api/recipes';
import { getIngredients } from 'api/ingedients'
import { getAreas } from 'api/areas'

// import styles
import s from './Recipes.module.scss';

const Recipes = () => {
  // store recipes and pagination
  const [recipesList, setRecipesList] = useState(null);
  const [page, setPage] = useState(null)
  const [total, setTotal] = useState(null)
  
  // store ingredients and recipes
  const [ingredients, setIngredients] = useState(null)
  const [areas, setAreas] = useState(null)

  // store loading and error message
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // get recipes
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
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

  // get ingredients
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getIngredients();
        setIsLoading(false);
        setIngredients(data);
        console.log('ingedients', data)
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, []);

  // get areas
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getAreas();
        setIsLoading(false);
        setAreas(data);
        console.log('areas', data)
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, []);

  return (
    <Container className={s.recipes_container}>

      {/* header with description and action back */}
      <div className={s.recipes_header_container}>
        <NavigationButton title="back"></NavigationButton>
        <MainTitle>desserts</MainTitle>
        <Subtitle>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>

      {/* recipes filters component */}
      <RecipeFilters ingredients={ingredients} areas={areas}/>

      {/* recipes list component */}
      <RecipeList recipesList={recipesList} isLoading={isLoading} errorMsg={errorMsg}/>
      
      {/* recipes pagination component */}
      <RecipePagination page={page} total={total}/>
    </Container>
  );
};

export default Recipes;
