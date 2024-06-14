export const SET_INGREDIENTS_FILTER = 'SET_INGREDIENTS_FILTER';
export const CLEAR_INGREDIENTS_FILTER = 'CLEAR_INGREDIENTS_FILTER';
export const SET_AREA_FILTER = 'SET_AREA_FILTER';
export const CLEAR_AREA_FILTER = 'CLEAR_AREA_FILTER';
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const CLEAR_CATEGORY_FILTER = 'CLEAR_CATEGORY_FILTER';

export const setIngredientsFilter = ingredients => ({
  type: SET_INGREDIENTS_FILTER,
  payload: ingredients,
});

export const clearIngredientsFilter = () => ({
  type: CLEAR_INGREDIENTS_FILTER
});

export const setAreaFilter = area => ({
  type: SET_AREA_FILTER,
  payload: area,
});

export const clearAreaFilter = () => ({
  type: CLEAR_AREA_FILTER
});

export const setCategoryFilter = category => ({
  type: SET_CATEGORY_FILTER,
  payload: category,
});

export const clearCategoryFilter = () => ({
  type: CLEAR_CATEGORY_FILTER
});
