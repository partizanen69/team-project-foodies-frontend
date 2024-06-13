import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getUserDetailsById = async id => {
  try {
    const result = await axios.get(`users/user-details/${id}`);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};
