import { useEffect, useState } from 'react';
import { getUserDetailsById } from 'api/users';
import Loader from 'components/Loader/Loader';
import s from './RecipeCard.module.scss';

export const RecipeCard = ({ recipe }) => {
  const [userDetails, setUserDetails] = useState({
    name: 'User',
    avatarUrl:
      'https://s.gravatar.com/avatar/d3be4c91cad8e30e787dab2c318417a5?d=retro',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (recipe) {
      (async () => {
        try {
          //   const data = await getUserDetailsById(recipe.owner);
          setIsLoading(false);
          //   setUserDetails(data);
        } catch (err) {
          setIsLoading(false);
          setErrorMsg(err.message);
        }
      })();
    }
  }, [recipe]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <div>{errorMsg}</div>
      ) : recipe ? (
        <div className={s.recipeCardContainer}>
          <div className={s.recipeImgWrapper}>
            <img
              src={recipe.thumb}
              alt={recipe.title}
              className={s.recipeImg}
            />
          </div>
          <h3 className={s.recipeTitle}>{recipe.title}</h3>
          <p className={s.recipeDescription}>{recipe.description}</p>
          <div className={s.bottomWrapper}>
            <div className={s.avatarWrapper}>
              <img
                src={userDetails.avatarUrl}
                alt={userDetails.name}
                className={s.avatarImgWrapper}
              />
              <p className={s.avatarName}>{userDetails.name}</p>
            </div>
            <div className={s.recipeCardIconWrapper}>
              <button className={s.recipeCardIcon}>Fav</button>
              <button className={s.recipeCardIcon}>Link</button>
            </div>
          </div>
        </div>
      ) : (
        <div>There is no information about recipe</div>
      )}
    </>
  );
};
