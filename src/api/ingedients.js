import axios from 'axios';

export const getIngredients = async () => {
  const result = await axios.get('ingredients');
  return result.data;
};
