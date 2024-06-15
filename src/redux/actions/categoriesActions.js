export const SET_CATEGORY = 'SET_CATEGORY';
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY';

export const setCategory = category => ({
  type: SET_CATEGORY,
  payload: category,
});

export const clearCategory = () => ({
  type: CLEAR_CATEGORY,
});
