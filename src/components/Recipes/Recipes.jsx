// import react tools
import React, { useEffect, useState, useRef } from 'react';
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
import { getIngredients } from 'api/ingedients';
import { getAreasList } from 'api/areas';

// import store actions
import { setIngredients } from '../../redux/actions/ingredientsActions';
import { setAreas } from '../../redux/actions/areasActions';
import { clearPageFilter } from '../../redux/actions/filtersActions';

// import styles
import s from './Recipes.module.scss';

const Recipes = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const category = useSelector(state => state.category.category);

  // store recipes and pagination
  const [recipesList, setRecipesList] = useState(null);

  // store loading and error message
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // store window wirth to set recipes limit
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [limit, setLimit] = useState(windowWidth >= 1440 ? 12 : 10);
  const [total, setTotal] = useState(window.innerWidth);
  const contentRef = useRef(null);

  // get recipes
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getRecipes({
          page: filters.page,
          limit: limit,
          category: filters.category,
          ingredients: filters.ingredients,
          area: filters.area,
        });
        setIsLoading(false);
        setRecipesList(data.recipes);
        setLimit(windowWidth >= 1440 ? 12 : 10);
        setTotal(data.total);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [
    filters.ingredients,
    filters.area,
    windowWidth,
    filters.page,
    limit,
    filters.category,
  ]);

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
        const data = await getAreasList();
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
  }, [filters.area, filters.ingredients, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container className={s.recipes_container}>
      {/* header with description and action back */}
      <div className={s.recipes_header_container} ref={contentRef}>
        <NavigationButton title="back"></NavigationButton>
        <MainTitle>{category.name}</MainTitle>
        <Subtitle>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>

      <div className={s.content_wrapper}>
        {/* recipes filters component */}
        <RecipeFilters />

        <div className={s.recipes_wrapper}>
          {/* recipes list component */}
          <RecipeList
            recipesList={recipesList}
            isLoading={isLoading}
            errorMsg={errorMsg}
            scrollToRef={contentRef}
          />

          {/* recipes pagination component */}
          <RecipePagination total={Math.ceil(total / limit)} />
        </div>
      </div>
    </Container>
  );
};

export default Recipes;
