import axios from 'axios';
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
} from './actionTypes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND || 'http://localhost:3002/api';

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = user => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

const logoutAction = () => ({ type: LOGOUT });

const fetchCurrentUserRequest = () => ({ type: FETCH_CURRENT_USER_REQUEST });
const fetchCurrentUserSuccess = user => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  payload: user,
});
const fetchCurrentUserFailure = error => ({
  type: FETCH_CURRENT_USER_FAILURE,
  payload: error,
});

export const fetchCurrentUser = () => async dispatch => {
  dispatch(fetchCurrentUserRequest());
  const token = localStorage.getItem('jwt-token');

  if (!token) {
    dispatch(fetchCurrentUserFailure('No token found'));
    return;
  }

  try {
    const response = await axios.get('/users/current', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = response.data;
    dispatch(fetchCurrentUserSuccess(user));
  } catch (error) {
    dispatch(
      fetchCurrentUserFailure(error.response.data.message || error.message)
    );
  }
};

export const login = (email, password) => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('/users/login', { email, password });
    const { user, token } = response.data;
    localStorage.setItem('jwt-token', token);
    dispatch(loginSuccess(user, token));
    toast.success('Welcome back to Foodies!');
  } catch (error) {
    dispatch(loginFailure(error.response.data.message || error.message));
    toast.error(error.response.data.message || error.message);
  }
};

export const register = (name, email, password) => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await axios.post('/users/register', {
      name,
      email,
      password,
    });
    const { user } = response.data;
    dispatch(registerSuccess(user));
    toast.success('Welcome to Foodies!');
  } catch (error) {
    dispatch(registerFailure(error.response.data.message || error.message));
    toast.error(error.response.data.message || error.message);
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwt-token');
  dispatch(logoutAction());
  toast.success('Successfully logged out.');
};
