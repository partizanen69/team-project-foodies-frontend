import { Ingredient } from '../Ingredient/Ingredient';
import s from './Ingredients.module.scss';

export const Ingredients = ({ ingredients }) => {
  return (
    <div className={s.ingredients_wrap}>
      <h4 className={s.title}>Ingredients</h4>
      <div className={s.ingredients_list_wrap}>
        {ingredients && ingredients.length > 0 && (
          <ul className={s.ingredients_list}>
            {ingredients.map(ingredient => {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
