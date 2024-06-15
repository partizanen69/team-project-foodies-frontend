import { showError } from 'api/api.utils';
import RoundButton from 'components/RoundButton/RoundButton';

const RemoveFavorite = ({ recipeId }) => {
  const removeRecipeFromFavorites = async () => {
    try {
      await removeRecipeFromFavorites({ recipeId });
    } catch (err) {
      showError(err.message);
    }
  };

  return (
    <RoundButton
      iconName="icon-trash"
      className=""
      onClick={removeRecipeFromFavorites}
    />
  );
};

export default RemoveFavorite;
