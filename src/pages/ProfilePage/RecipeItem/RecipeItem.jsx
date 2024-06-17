import PropTypes from 'prop-types';
import RoundButton from 'components/RoundButton/RoundButton';
import { useNavigate, useParams } from 'react-router-dom';
import RemoveItem from '../RemoveItem/RemoveItem';

import s from './RecipeItem.module.scss';
import { getImageSrc } from 'api/api.utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RecipeItem = ({ recipe, isFavorite }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [recipeImage, setRecipeImage] = useState(recipe.thumb);

  useEffect(() => {
    if (user && user.id && id) {
      setIsOwnProfile(user.id === id);
    }
  }, [user, id]);

  useEffect(() => {
    setRecipeImage(getImageSrc(recipe?.thumb));
  }, [recipe.thumb]);

  return (
    <li className={s.recipe_card}>
      <div className={s.thumb_wrapper}>
        <img
          src={recipeImage}
          alt={recipe.title}
          className={s.recipe_thumb}
          onError={() =>
            setRecipeImage(`${process.env.PUBLIC_URL}/image-placeholder.svg`)
          }
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

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    thumb: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
};

export default RecipeItem;
