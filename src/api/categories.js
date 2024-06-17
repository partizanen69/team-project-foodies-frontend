import axios from 'axios';

export const getCategories = async ({
  page = 1,
  limit = 11,
  all = false,
} = {}) => {
  const params = all ? {} : { page, limit };
  const result = await axios.get('/categories', { params });
  return result.data.slice().sort((a, b) => a.name.localeCompare(b.name));
};
