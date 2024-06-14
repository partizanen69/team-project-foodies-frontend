import { SET_AREAS } from '../actions/areasActions';

const initialState = {
  ingredients: [],
};

const areasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AREAS:
      return {
        ...state,
        areas: action.payload,
      };
    default:
      return state;
  }
};

export default areasReducer;
