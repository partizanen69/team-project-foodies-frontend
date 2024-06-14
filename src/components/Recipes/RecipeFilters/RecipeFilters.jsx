// import tools
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

  const [ingredientsSelect, setIngredientSelect] = useState(filters.ingredients);
  const [areaSelect, setAreaSelect] = useState(filters.area);

  const onIngredientChange = (event) => {
    const ingredient = event.target.value;

    if (ingredient === filters.ingredients) {
      setIngredientSelect(null);
      dispatch(clearIngredientsFilter());
    } else {
      setIngredientSelect(ingredient);
      dispatch(setIngredientsFilter(ingredient));
    }
  };

  const onAreaChange = (event) => {
    const area = event.target.value;

    if (area === filters.area) {
      setAreaSelect(null);
      dispatch(clearAreaFilter());
    } else {
      setAreaSelect(area);
      dispatch(setAreaFilter(area));
    }
  };

  useEffect(() => {
    setIngredientSelect(filters.ingredient);
  }, [filters.ingredient]);

  useEffect(() => {
    setAreaSelect(filters.area);
  }, [filters.area]);

  return (
    <div className={s.filters_wrapper}>
      {/* ingredients filter */}
      {areas ? (
        <div className={s.filter_container}>
          <select
            className={s.filter_select}
            value={ingredientsSelect ?? ''}
            onChange={onIngredientChange}
          >
            <option value="" disabled>
              Ingredients
            </option>
            {ingredients.map(ingredient => (
              <option
                key={ingredient._id}
                value={ingredient.name}
                className={s.filter_option}
              >
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
        
      ) : (
        <span>Ingredients list is empty</span>
      )}

      {/* areas filter */}
      {areas ? (
        <div className={s.filter_container}>
          <select
            className={s.filter_select}
            value={areaSelect ?? ''}
            onChange={onAreaChange}
          >
            <option value="" disabled>
              Areas
            </option>
            {areas.map(area => (
              <option
                key={area._id}
                value={area.name}
                className={s.filter_option}
              >
                {area.name}
              </option>
            ))}
          </select>
        </div>
        
      ) : (
        <span>Ingredients list is empty</span>
      )}
    </div>
  );
};

RecipeFilters.propTypes = {};

export default RecipeFilters;
