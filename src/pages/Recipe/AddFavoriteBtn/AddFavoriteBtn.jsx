import { useState } from 'react';
import s from './AddFavoriteBtn.module.scss';
import { toast } from 'react-toastify';
import {
  addRecipeToFavorites,
  removeRecipeFromFavorites,
} from '../../../api/recipes';

export const AddFavoriteBtn = ({ recipeId, isFavorite }) => {
  const [isLoading, setIsLoading] = useState(false);

  const doAddRecipeToFavorites = async () => {
    try {
      setIsLoading(true);
      await addRecipeToFavorites({ recipeId });
    } catch (err) {
      toast.error(
        `Error occured while trying to add recipe to favorites: ${err.message}`
      );
      setIsLoading(false);
    }
  };

  const doRemoveRecipeFromFavorites = async () => {
    try {
      setIsLoading(true);
      await removeRecipeFromFavorites({ recipeId });
    } catch (err) {
      toast.error(
        `Error occured while trying to add recipe to favorites: ${err.message}`
      );
      setIsLoading(false);
    }
  };

  return isFavorite ? (
    <button
      onClick={doAddRecipeToFavorites}
      className={s.add_favorite_btn}
      disabled={isLoading}
    >
      Add to favorites
    </button>
  ) : (
    <button
      onClick={doRemoveRecipeFromFavorites}
      className={s.add_favorite_btn}
      disabled={isLoading}
    >
      Remove from favorites
    </button>
  );
};
