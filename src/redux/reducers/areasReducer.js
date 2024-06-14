// areasReducer.js
import { SET_AREAS } from '../actions/areasActions';

const initialState = [];

const areasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AREAS:
      return action.payload;
    default:
      return state;
  }
};

export default areasReducer;
