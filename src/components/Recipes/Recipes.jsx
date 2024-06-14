// import react tools
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import components
import Container from 'components/Container/Container';
import NavigationButton from './NavigationButton/NavigationButton';
import MainTitle from 'components/MainTitle/MainTitle';
import Subtitle from 'components/Subtitle/Subtitle';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';

// import styles
import s from './Recipes.module.scss';

const Recipes = ({ recipes, recipesPerPage, recipesTotal, onBackClick }) => {
  const [recipesList, setRecipesList] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    setRecipesList(recipes);
    setTotal(recipesTotal);
  }, [recipes, recipesTotal]);

  return (
    <Container className={s.recipes_container}>
      <div className={s.recipes_header_container}>
        <NavigationButton title="back" action={onBackClick}></NavigationButton>
        <MainTitle>desserts</MainTitle>
        <Subtitle>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>
      <RecipeList recipesList={recipesList} />
      <RecipePagination total={total} />
    </Container>
  );
};

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  recipesPerPage: PropTypes.number.isRequired,
  recipesTotal: PropTypes.number.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default Recipes;
