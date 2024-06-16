import { useEffect, useState } from 'react';
import s from './RecipeImage.module.scss';
import { getImageSrc } from 'api/api.utils';

const RecipeImage = props => {
  const recipe = props.recipe;
  const [image, setImage] = useState(recipe.thum);

  useEffect(() => {
    setImage(getImageSrc(recipe?.thumb));
  }, [recipe.thumb]);

  return (
    <li key={recipe._id}>
      <img className={s.recipe_image} src={getImageSrc(image)} alt="" />
    </li>
  );
};

export default RecipeImage;
