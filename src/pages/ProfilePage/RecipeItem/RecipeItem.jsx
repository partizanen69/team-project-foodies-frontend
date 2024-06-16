import RoundButton from 'components/RoundButton/RoundButton';
import { useNavigate, useParams } from 'react-router-dom';
import RemoveItem from '../RemoveItem/RemoveItem';

import s from './RecipeItem.module.scss';
import { getAvatarSrc } from 'api/api.utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RecipeItem = ({ recipe, isFavorite }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }
  }, [user, id]);

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
        {isOwnProfile && (
          <RemoveItem recipeId={recipe._id} isFavorite={isFavorite} />
        )}
      </div>
    </li>
  );
};

export default RecipeItem;
