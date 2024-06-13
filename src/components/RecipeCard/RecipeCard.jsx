import { useNavigate } from 'react-router-dom';
import { RecipeCreatedBy } from 'pages/Recipe/RecipeCreatedBy/RecipeCreatedBy';
import { AddFavoriteBtn } from 'pages/Recipe/AddFavoriteBtn/AddFavoriteBtn';
import RoundButton from 'components/RoundButton/RoundButton';
import s from './RecipeCard.module.scss';

export const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <>
      {recipe ? (
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
            <RecipeCreatedBy ownerId={recipe.owner} popular={true} />
            <div className={s.recipeCardIconWrapper}>
              <AddFavoriteBtn recipeId={recipe._id} round={true} />
              <RoundButton onClick={() => navigate(`/recipe/${recipe._id}`)} />
            </div>
          </div>
        </div>
      ) : (
        <div>There is no information about recipe</div>
      )}
    </>
  );
};
