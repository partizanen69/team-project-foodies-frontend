import {
  SET_INGREDIENTS_FILTER,
  CLEAR_INGREDIENTS_FILTER,
  SET_AREA_FILTER,
  CLEAR_AREA_FILTER,
  SET_PAGE_FILTER,
  CLEAR_PAGE_FILTER,
  SET_CATEGORY_FILTER,
  CLEAR_CATEGORY_FILTER

} from '../actions/filtersActions';

const initialState = {
  ingredients: null,
  area: null,
  category: 'Dessert',
  page: 1,
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_FILTER:
      return {
        ...state,
        ingredients: action.payload,
      };
    case CLEAR_INGREDIENTS_FILTER:
      return {
        ...state,
        ingredients: null,
      };
    case SET_AREA_FILTER:
      return {
        ...state,
        area: action.payload,
      };
    case CLEAR_AREA_FILTER:
      return {
        ...state,
        area: null,
      };
    case SET_PAGE_FILTER:
      return {
        ...state,
        page: action.payload,
      };
    case CLEAR_PAGE_FILTER:
      return {
        ...state,
        page: 1,
      };
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        category: action.payload,
      };
    case CLEAR_CATEGORY_FILTER:
      return {
        ...state,
        category: null,
      };
    default:
      return state;
  }
};

export default filtersReducer;
