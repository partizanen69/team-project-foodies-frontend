import s from './RecipeCreatedBy.module.scss';

export const RecipeCreatedBy = ({ name, avatar }) => {
  const avatarPlaceholder = process.env.PUBLIC_URL + '/avatar-placeholder.svg';
  return (
    <div className={s.recipe_created_by_wrap}>
      <button className={s.recipe_created_by}>
        <div className={s.avatar_wrap}>
          <img src={avatar || avatarPlaceholder} alt={name} />
        </div>
        <div className={s.name_wrap}>
          <p className={s.created_by}>Created by:</p>
          <p className={s.name}>{name}</p>
        </div>
      </button>
    </div>
  );
};
