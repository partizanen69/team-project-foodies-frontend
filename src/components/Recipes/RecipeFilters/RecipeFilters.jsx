// import tools
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import styles
import s from './RecipeFilters.module.scss';

const RecipeFilters = (selectedFilter = '', onFilterChange) => {
  const ingredients = useSelector(state => state.ingredients);
  const areas = useSelector(state => state.areas);
  console.log('ingredients', ingredients)

  return (
    <div>
      {/* ingridients filter */}
      {Array.isArray(ingredients) ? (
        <select
          className={s.filter_select}
          value={selectedFilter}
          onChange={e => onFilterChange(e.target.value)}
        >
          <option value="" disabled>
            Ingredients
          </option>
          {ingredients.map(ingredient => {
            return (
              <option
                key={ingredient._id}
                value={ingredient.name}
                className={s.filter_option}
              >
                {ingredient.name}
              </option>
            );
          })}
        </select>
      ) : (
        <span>ingredients list is empty</span>
      )}
    </div>
  );
};

RecipeFilters.propTypes = {

};

export default RecipeFilters;
