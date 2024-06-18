import { useEffect, useState } from 'react';
import s from './RecipeImage.module.scss';
import { getImageSrc } from 'api/api.utils';

const RecipeImage = props => {
  const recipe = props.recipe;
  const [image, setImage] = useState(recipe?.thumb);

  useEffect(() => {
    setImage(getImageSrc(recipe?.thumb));
  }, [recipe.thumb]);

  return (
    <li key={recipe._id}>
      <img
        className={s.recipe_image}
        src={image}
        onError={() =>
          setImage(`${process.env.PUBLIC_URL}/image-placeholder.svg`)
        }
        alt={recipe.title}
      />
    </li>
  );
};

export default RecipeImage;
