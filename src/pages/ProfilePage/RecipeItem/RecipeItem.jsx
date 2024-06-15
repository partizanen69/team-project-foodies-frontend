import RoundButton from 'components/RoundButton/RoundButton';
import { useNavigate } from 'react-router-dom';
import RemoveItem from '../RemoveItem/RemoveItem';

import s from './RecipeItem.module.scss';
import { getAvatarSrc } from 'api/api.utils';

const RecipeItem = ({ recipe, ownRecipe }) => {
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
        <RemoveItem recipeId={recipe._id} ownRecipe={ownRecipe} />
      </div>
    </li>
  );
};

export default RecipeItem;
