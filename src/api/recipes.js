import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getRecipes = async ({
  page,
  limit,
  category,
  area,
  ingredients,
} = {}) => {
  const result = await axios.get('recipes', {
    params: {
      ...(page ? { page } : null),
      ...(limit ? { limit } : null),
      ...(category ? { category } : null),
      ...(area ? { area } : null),
      ...(ingredients ? { ingredients } : null),
    },
  });
  return result.data;
};

export const getRecipeById = async ({ id }) => {
  try {
    const result = await axios.get(`/recipes/${id}`);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const getFavoriteRecipes = async ({
  page = 1,
  limit = 10,
  recipeIds,
}) => {
  try {
    // console.log(page);
    const result = await axios.get('/recipes/favorites', {
      params: {
        page,
        limit,
        ...(recipeIds && recipeIds.length
          ? { recipeIds: JSON.stringify(recipeIds) }
          : null),
      },
    });
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const addRecipeToFavorites = async ({ recipeId }) => {
  try {
    const response = await axios.post(`/recipes/${recipeId}/favorites`);
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const removeRecipeFromFavorites = async ({ recipeId }) => {
  try {
    const response = await axios.delete(`/recipes/${recipeId}/favorites`);
    return response.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const getPopularRecipes = async () => {
  try {
    const result = await axios.get('/recipes/popular');
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const getUserRecipes = async ({ owner, page = 1, limit = 10 }) => {
  try {
    const result = await axios.get(`/recipes/user-recipes`, {
      params: {
        owner,
        page,
        limit,
      },
    });

    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const addNewRecipe = async recipe => {
  try {
    const result = await axios.post('/recipes', recipe, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const deleteRecipe = async recipeId => {
  try {
    const result = await axios.delete(`/recipes/${recipeId}`);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};
