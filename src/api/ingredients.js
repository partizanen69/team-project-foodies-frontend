import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getIngredientsList = async () => {
    try {
        const result = await axios.get('/ingredients');
        return result.data.slice().sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
        handleAxiosError(err);
    }
};



