// import react tools
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

// import store actions
import { setIngredients } from '../../redux/actions/ingredientsActions';
import { setAreas } from '../../redux/actions/areasActions';
import { clearPageFilter } from '../../redux/actions/filtersActions';

// import styles
import s from './Recipes.module.scss';

const Recipes = () => {
  const dispatch = useDispatch();
  const { ingredients, area, category, page } = useSelector(state => state.filters);

  // store recipes and pagination
  const [recipesList, setRecipesList] = useState(null);

  // store loading and error message
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // get recipes
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getRecipes({ 
          page: page,
          ingredients: ingredients,
          area: area
        });
        setIsLoading(false);
        setRecipesList(data.recipes);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [page, category, ingredients, area ]);

  // get ingredients
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getIngredients();
        setIsLoading(false);
        dispatch(setIngredients(data));
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [dispatch]);

  // get areas
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getAreas();
        setIsLoading(false);
        dispatch(setAreas(data));
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [dispatch]);

  // Clear page filter when area or ingredients change
  useEffect(() => {
    dispatch(clearPageFilter());
  }, [area, ingredients, dispatch]);

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
      <RecipeFilters />

      {/* recipes list component */}
      <RecipeList recipesList={recipesList} isLoading={isLoading} errorMsg={errorMsg}/>
      
      {/* recipes pagination component */}
      <RecipePagination />
    </Container>
  );
};

export default Recipes;
