import { useMemo, useState } from 'react';
import s from './AddFavoriteBtn.module.scss';
import { toast } from 'react-toastify';
import {
  addRecipeToFavorites,
  removeRecipeFromFavorites,
} from '../../../api/recipes';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/selectors';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import RoundButton from 'components/RoundButton/RoundButton';

const showError = msg => {
  toast.error(msg, {
    autoClose: 5000,
  });
};

export const AddFavoriteBtn = ({
  recipeId,
  round = false,
  favoriteRecipes,
  setFavoriteRecipes,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const isFavorite = useMemo(() => {
    return (favoriteRecipes || []).some(recipe => recipe._id === recipeId);
  }, [recipeId, favoriteRecipes]);
  const { openModal } = useOutletContext();

  const doAddRecipeToFavorites = async () => {
    try {
      setIsLoading(true);
      const recipe = await addRecipeToFavorites({ recipeId });
      setFavoriteRecipes(favoriteRecipes => {
        return [...(favoriteRecipes || []), recipe];
      });
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
      setFavoriteRecipes(favoriteRecipes => {
        return (favoriteRecipes || []).filter(
          recipe => recipe._id !== recipeId
        );
      });
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

  const onClickHandler = () => {
    if (!currentUser) {
      openModal('sign in');
      return;
    }
    isFavorite ? doRemoveRecipeFromFavorites() : doAddRecipeToFavorites();
  };

  return (
    <>
      {!round && (
        <button
          onClick={() => onClickHandler()}
          className={s.add_favorite_btn}
          disabled={isLoading}
        >
          {btnText}
        </button>
      )}
      {round && (
        <RoundButton
          iconName={'icon-heart'}
          onClick={() => onClickHandler()}
          iconClassName={isFavorite ? 'favorite' : ''}
        />
      )}
    </>
  );
};

AddFavoriteBtn.propTypes = {
  recipeId: PropTypes.string.isRequired,
  round: PropTypes.bool,
};
