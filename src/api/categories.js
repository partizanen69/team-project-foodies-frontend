import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getCategoriesList = async () => {
    try {
        const result = await axios.get('/categories');
        return result.data;
    } catch (err) {
        handleAxiosError(err);
    }
};
