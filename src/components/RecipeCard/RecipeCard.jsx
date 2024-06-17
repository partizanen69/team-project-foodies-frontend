import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipeCreatedBy } from 'pages/Recipe/RecipeCreatedBy/RecipeCreatedBy';
import { AddFavoriteBtn } from 'pages/Recipe/AddFavoriteBtn/AddFavoriteBtn';
import Container from 'components/Container/Container';
import RoundButton from 'components/RoundButton/RoundButton';
import s from './RecipeCard.module.scss';

export const RecipeCard = ({
  recipe,
  scrollToTop = true,
  favoriteRecipes,
  setFavoriteRecipes,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [pathname, scrollToTop]);

  return (
    <>
      {recipe ? (
        <Container className={s.recipeCardContainer}>
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
            <RecipeCreatedBy
              ownerId={recipe.owner._id}
              name={recipe.owner.name}
              avatar={recipe.owner.avatarURL}
              popular={true}
            />
            <div className={s.recipeCardIconWrapper}>
              <AddFavoriteBtn
                favoriteRecipes={favoriteRecipes}
                setFavoriteRecipes={setFavoriteRecipes}
                recipeId={recipe._id}
                round={true}
              />
              <RoundButton onClick={() => navigate(`/recipe/${recipe._id}`)} />
            </div>
          </div>
        </Container>
      ) : (
        <div>There is no information about recipe</div>
      )}
    </>
  );
};
