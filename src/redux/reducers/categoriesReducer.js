import { SET_CATEGORY, CLEAR_CATEGORY } from '../actions/categoriesActions';

const initialState = { category: null }

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
