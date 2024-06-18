import { showError } from 'api/api.utils';
import {
  deleteRecipe,
  getFavoriteRecipes,
  getUserRecipes,
  removeRecipeFromFavorites,
} from 'api/recipes';
import RoundButton from 'components/RoundButton/RoundButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromList,
  renewList,
  setFavorites,
  setPage,
  setRecipes,
} from '../../../redux/reducers/listReducer';
import { selectPage, selectPageLimit } from '../../../redux/selectors';
import { useParams } from 'react-router-dom';

const RemoveItem = ({ recipeId, isFavorite = false }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentPage = useSelector(selectPage);
  const limit = useSelector(selectPageLimit);

  const handleRemoveFavorite = async () => {
    try {
      await removeRecipeFromFavorites({ recipeId });

      dispatch(removeFromList(recipeId));

      const result = await getFavoriteRecipes({
        page: currentPage,
        limit,
      });
      console.log(result);
      dispatch(renewList(result.recipes));
      const newTotalFavorites = result.total;
      dispatch(setFavorites(newTotalFavorites));

      if (
        newTotalFavorites <= limit * (currentPage - 1) &&
        newTotalFavorites !== 0
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

      const result = await getUserRecipes({
        owner: id,
        page: currentPage,
        limit: limit,
      });
      dispatch(renewList(result.recipes));
      const newTotalRecipes = result.total;
      dispatch(setRecipes(newTotalRecipes));

      if (
        newTotalRecipes <= limit * (currentPage - 1) &&
        newTotalRecipes !== 0
      ) {
        dispatch(setPage(currentPage - 1));
      }
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
