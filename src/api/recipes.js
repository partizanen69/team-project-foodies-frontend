import axios from 'axios';

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
