import RoundButton from 'components/RoundButton/RoundButton';
import { useNavigate } from 'react-router-dom';
import RemoveFavorite from '../MyFavorites/RemoveFavorite/RemoveFavorite';

import s from './RecipeItem.module.scss';
import { getAvatarSrc } from 'api/api.utils';

const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <li className={s.recipe_card}>
      <div className={s.thumb_wrapper}>
        <img
          src={getAvatarSrc(recipe.thumb)}
          alt={recipe.title}
          className={s.recipe_thumb}
        />
      </div>

      <div className={s.recipe_info}>
        <p className={s.recipe_title}>{recipe.title}</p>
        <p className={s.recipe_description}>{recipe.description}</p>
      </div>

      <div className={s.button_group}>
        <RoundButton onClick={() => navigate(`/recipe/${recipe._id}`)} />
        <RemoveFavorite recipeId={recipe._id} />
      </div>
    </li>
  );
};

export default RecipeItem;
