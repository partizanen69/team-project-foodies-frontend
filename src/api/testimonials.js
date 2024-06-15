import axios from 'axios';
import { handleAxiosError } from './api.utils';


export const findTestimonials = async () => {
  try {
    const result = await axios.get(`/testimonials`);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};
