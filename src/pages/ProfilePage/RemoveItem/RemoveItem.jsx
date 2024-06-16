import { showError } from 'api/api.utils';
import { deleteRecipe, removeRecipeFromFavorites } from 'api/recipes';
import RoundButton from 'components/RoundButton/RoundButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromList,
  setFavorites,
  setPage,
} from '../../../redux/reducers/listReducer';
import {
  selectFavorites,
  selectPage,
  selectPageLimit,
} from '../../../redux/selectors';

const RemoveItem = ({ recipeId, isFavorite = false }) => {
  const dispatch = useDispatch();
  const totalFavorites = useSelector(selectFavorites);
  const currentPage = useSelector(selectPage);
  const limit = useSelector(selectPageLimit);

  const handleRemoveFavorite = async () => {
    try {
      await removeRecipeFromFavorites({ recipeId });

      dispatch(removeFromList(recipeId));
      const newTotalFavorites = totalFavorites - 1;
      dispatch(setFavorites(newTotalFavorites));

      if (
        newTotalFavorites % limit === 0 &&
        newTotalFavorites / limit < totalFavorites / limit
      ) {
        dispatch(setPage(currentPage - 1));
      }
    } catch (err) {
      showError(err.message);
    }
  };

  const handleRemoveOwnRecipe = async () => {
    try {
      if (!recipeId) return;

      await deleteRecipe(recipeId);
      dispatch(removeFromList(recipeId));
    } catch (err) {
      showError(err.message);
    }
  };

  return (
    <RoundButton
      iconName="icon-trash"
      className=""
      onClick={isFavorite ? handleRemoveFavorite : handleRemoveOwnRecipe}
    />
  );
};

export default RemoveItem;
