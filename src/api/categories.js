import axios from 'axios';

import { handleAxiosError } from './api.utils';

export const getCategoriesList = async () => {
    try {
        const result = await axios.get('/categories');
        return result.data;
    } catch (err) {
        handleAxiosError(err);
    }


export const getCategories = async ({
  page = 1,
  limit = 11,
  all = false,
} = {}) => {
  const params = all ? {} : { page, limit };
  const result = await axios.get('/categories', { params });
  return result.data;
};
