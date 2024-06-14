import { 
    SET_INGREDIENTS_FILTER,
    CLEAR_INGREDIENTS_FILTER,
    SET_AREA_FILTER,
    CLEAR_AREA_FILTER
} from '../actions/filtersActions';

const initialState = {
    ingredients: null,
    area: null,
    category: 'Dessert'
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_FILTER:
      return {
        ...state,
        ingredients: action.payload
      };
    case CLEAR_INGREDIENTS_FILTER:
      return {
        ...state,
        ingredients: null
      };
    case SET_AREA_FILTER:
      return  {
        ...state,
        area: action.payload
      };
    case CLEAR_AREA_FILTER:
      return  {
        ...state,
        area: null
      };
    default:
      return state;
  }
};

export default filtersReducer;
