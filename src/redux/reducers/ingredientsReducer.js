import { SET_INGREDIENTS } from '../actions/ingredientsActions';

const initialState = {
  ingredients: [],
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
