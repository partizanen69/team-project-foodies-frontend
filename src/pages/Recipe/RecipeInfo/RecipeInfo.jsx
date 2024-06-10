import { RecipeCreatedBy } from '../RecipeCreatedBy/RecipeCreatedBy';
import s from './RecipeInfo.module.scss';

export const RecipeInfo = ({ recipe }) => {
  return (
    <div className={s.recipe_info_wrap}>
      <div className={s.thumb_wrap}>
        <img src={recipe.thumb} alt={recipe.title} />
      </div>
      <div className={s.recipe_info}>
        <h3 className={s.recipe_info_title}>{recipe.title}</h3>
        <div className={s.recipe_info_category}>
          <div className={s.recipe_info_category_item}>{recipe.category}</div>
          <div className={s.recipe_info_category_item}>{recipe.time} min</div>
        </div>
        <p className={s.recipe_info_description}>{recipe.description}</p>
        <RecipeCreatedBy
          name={recipe.owner.name}
          avatar={recipe.owner.avatar}
        />
      </div>
    </div>
  );
};
