// import tools
// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// import components
import Select from '../Select';

// import styles
import s from './RecipeFilters.module.scss';

// import store actions
import {
  setIngredientsFilter,
  clearIngredientsFilter,
  setAreaFilter,
  clearAreaFilter,
} from '../../../redux/actions/filtersActions';

const RecipeFilters = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients);
  const areas = useSelector(state => state.areas);
  const filters = useSelector(state => state.filters);

  const handleIngredient = ({ _id: id }) => {
    if (id === filters.ingredients) {
      dispatch(clearIngredientsFilter());
    } else {
      dispatch(setIngredientsFilter(id));
    }
  };

  const handleArea = ({ _id: id }) => {
    if (id === filters.area) {
      dispatch(clearAreaFilter());
    } else {
      dispatch(setAreaFilter(id));
    }
  };

  const renderSelect = item => {
    let options, onChange, className;

    switch (item) {
      case 'ingredients':
        options = ingredients;
        onChange = handleIngredient;
        className = 'ingredients';
        break;
      case 'area':
        options = areas;
        onChange = handleArea;
        className = 'area';
        break;
      default:
        return null;
    }

    return (
      <li key={item}>
          <Select
            options={options}
            onChange={onChange}
            value={item}
            className={className}
          />
      </li>
    );
  };

  return (
    <> 
      <ul className={s.recipeFilters}>
        {['ingredients', 'area'].map(item => renderSelect(item))}
      </ul>
    </>
  );
};

RecipeFilters.propTypes = {
  handleIngredient: PropTypes.func,
  handleArea: PropTypes.func,
};

export default RecipeFilters;
