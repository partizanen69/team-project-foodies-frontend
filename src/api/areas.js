import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getAreasList = async () => {
  try {
    const result = await axios.get('/areas');
    return result.data.slice().sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    handleAxiosError(err);
  }
};
