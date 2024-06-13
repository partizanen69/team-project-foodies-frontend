import axios from 'axios';

export const getCategories = async ({ page = 1, limit = 11 } = {}) => {
  const result = await axios.get('/categories', {
    params: {
      ...(page ? { page } : null),
      ...(limit ? { limit } : null),
    },
  });
  return result.data;
};
