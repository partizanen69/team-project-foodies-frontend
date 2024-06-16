import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  UPDATE_AVATAR_BEGIN,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAILURE,
  SET_AVATAR,
} from '../actions/actionTypes';

const initialState = {
  user: null,
  token: localStorage.getItem('jwt-token') || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case FETCH_CURRENT_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case FETCH_CURRENT_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, user: null, token: null, loading: false, error: null };
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_AVATAR_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case UPDATE_AVATAR_SUCCESS:
        localStorage.setItem('avatarURL', action.payload.avatarURL); // Store avatar URL
        return {
          ...state,
          loading: false,
          user: {
            ...state.user,
            avatarURL: action.payload.avatarURL,
          },
          error: null,
        };
    case UPDATE_AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: action.payload.avatarURL,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
