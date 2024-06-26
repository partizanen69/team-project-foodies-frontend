import { getImageSrc } from '../../../api/api.utils';
import { AddFavoriteBtn } from '../AddFavoriteBtn/AddFavoriteBtn';
import { Ingredients } from '../Ingredients/Ingredients';
import { RecipeCreatedBy } from '../RecipeCreatedBy/RecipeCreatedBy';
import { RecipePreparation } from '../RecipePreparation/RecipePreparation';
import s from './RecipeInfo.module.scss';

export const RecipeInfo = ({ recipe, favoriteRecipes, setFavoriteRecipes }) => {
  return (
    <div className={s.recipe_info_wrap}>
      <div className={s.thumb_wrap}>
        <img src={getImageSrc(recipe.thumb)} alt={recipe.title} />
      </div>
      <div className={s.recipe_details_wrap}>
        <div className={s.recipe_info}>
          <h3 className={s.recipe_info_title}>{recipe.title}</h3>
          <div className={s.recipe_info_category}>
            <div className={s.recipe_info_category_item}>{recipe.category}</div>
            <div className={s.recipe_info_category_item}>{recipe.time} min</div>
          </div>
          <p className={s.recipe_info_description}>{recipe.description}</p>
          <RecipeCreatedBy
            ownerId={recipe.owner._id}
            name={recipe.owner.name}
            avatar={recipe.owner.avatarURL}
          />
        </div>
        <Ingredients ingredients={recipe.ingredients} />
        <RecipePreparation instructions={recipe.instructions} />
        <div className={s.add_favorite_wrap}>
          <AddFavoriteBtn
            recipeId={recipe._id}
            favoriteRecipes={favoriteRecipes}
            setFavoriteRecipes={setFavoriteRecipes}
          />
        </div>
      </div>
    </div>
  );
};
