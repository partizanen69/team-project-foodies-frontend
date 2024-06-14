// import tools
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import styles
import s from './RecipeFilters.module.scss';

const RecipeFilters = (ingredients, areas, selectedFilter = '', onFilterChange) => {

  return (
    <div>
      {/* ingridients filter */}
      {ingredients && Array.isArray(ingredients) ? (
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
  ingredients: PropTypes.arrayOf(PropTypes.object),
  areas: PropTypes.arrayOf(PropTypes.object),
};

export default RecipeFilters;
