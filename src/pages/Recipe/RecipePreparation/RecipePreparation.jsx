import s from './RecipePreparation.module.scss';

export const RecipePreparation = ({ instructions }) => {
  return (
    <div className={s.recipe_preparation_wrap}>
      <h3 className={s.title}>Recipe Preparation</h3>

      {instructions &&
        instructions.split('\n').map((paragraph, idx) => (
          <p key={idx} className={s.instruction}>
            {paragraph}
          </p>
        ))}
    </div>
  );
};
