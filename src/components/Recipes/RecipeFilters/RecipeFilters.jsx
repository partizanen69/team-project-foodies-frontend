// import tools
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// import styles
import s from './RecipeFilters.module.scss';

// import store actions
import {
  setIngredientsFilter,
  clearIngredientFilter,
  setAreaFilter,
  clearAreaFilter,
} from '../../../redux/actions/filtersActions';

const RecipeFilters = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients);
  // const areas = useSelector(state => state.areas);
  const filters = useSelector(state => state.filters);
  const [ingredientsSelect, setIngredientSelect] = useState(filters.ingredients);

  const onFilterChange = (event) => {
    const ingredientId = event.target.value;
    setIngredientSelect(ingredientId);
    dispatch(setIngredientsFilter(ingredientId));
  };

  useEffect(() => {
    setIngredientSelect(filters.ingredient);
  }, [filters.ingredient]);

  return (
    <div>
      {/* ingredients filter */}
      {ingredients ? (
        <select
          className={s.filter_select}
          value={ingredientsSelect ?? ''}
          onChange={onFilterChange}
        >
          <option value="" disabled>
            Ingredients
          </option>
          {ingredients.map(ingredient => (
            <option
              key={ingredient._id}
              value={ingredient._id}
              className={s.filter_option}
            >
              {ingredient.name}
            </option>
          ))}
        </select>
      ) : (
        <span>Ingredients list is empty</span>
      )}
    </div>
  );
};

RecipeFilters.propTypes = {};

export default RecipeFilters;
