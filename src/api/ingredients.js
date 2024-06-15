import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getIngredientsList = async () => {
    try {
        const result = await axios.get('/ingredients');
        return result.data;
    } catch (err) {
        handleAxiosError(err);
    }
};



