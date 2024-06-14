import axios from 'axios';

export const getAreas = async () => {
  const result = await axios.get('areas');
  return result.data;
};
