import { useEffect, useState } from 'react';
import s from './AddFavoriteBtn.module.scss';
import { toast } from 'react-toastify';
import {
  addRecipeToFavorites,
  getFavoriteRecipes,
  removeRecipeFromFavorites,
} from '../../../api/recipes';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/selectors';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';

const showError = msg => {
  toast.error(msg, {
    autoClose: 5000,
  });
};

export const AddFavoriteBtn = ({ recipeId }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(() =>
    currentUser && recipeId ? true : false
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const { openModal } = useOutletContext();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setIsLoading(true);

    (async () => {
      try {
        const favoriteRecipes = await getFavoriteRecipes({
          recipeIds: [recipeId],
        });

        setIsFavorite(favoriteRecipes?.recipes[0]?._id === recipeId);
      } catch (err) {
        showError(
          `Could not check if recipe is favorite because of error: ${err.message}`
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentUser, recipeId]);

  const doAddRecipeToFavorites = async () => {
    try {
      setIsLoading(true);
      await addRecipeToFavorites({ recipeId });
      setIsFavorite(true);
    } catch (err) {
      showError(
        `Error occured while trying to add recipe to favorites: ${err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const doRemoveRecipeFromFavorites = async () => {
    try {
      setIsLoading(true);
      await removeRecipeFromFavorites({ recipeId });
      setIsFavorite(false);
    } catch (err) {
      showError(
        `Error occured while trying to add recipe to favorites: ${err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const btnText = (() => {
    if (isLoading) {
      return 'Loading...';
    }

    if (!currentUser) {
      return 'Add to favorites';
    }

    return isFavorite ? 'Remove from favorites' : 'Add to favorites';
  })();

  return (
    <button
      onClick={() => {
        if (!currentUser) {
          openModal('sign in');
          return;
        }
        isFavorite ? doRemoveRecipeFromFavorites() : doAddRecipeToFavorites();
      }}
      className={s.add_favorite_btn}
      disabled={isLoading}
    >
      {btnText}
    </button>
  );
};

AddFavoriteBtn.propTypes = {
  recipeId: PropTypes.string.isRequired,
};