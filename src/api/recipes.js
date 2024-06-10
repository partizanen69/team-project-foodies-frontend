import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getRecipes = async ({ page, limit, category, area } = {}) => {
  const result = await axios.get('/recipes', {
    params: {
      ...(page ? { page } : null),
      ...(limit ? { limit } : null),
      ...(category ? { category } : null),
      ...(area ? { area } : null),
    },
  });
  return result.data;
};

export const getRecipeById = async ({ id }) => {
  try {
    const result = await axios.get(`/recipes/${id}`);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};
