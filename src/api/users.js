import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getUserDetailsById = async ({ id }) => {
  try {
    const result = await axios.get(`/users/user-details/${id}`);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const updateAvatar = async formData => {
  try {
    const result = await axios.patch(`/users/avatars`, formData);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};
