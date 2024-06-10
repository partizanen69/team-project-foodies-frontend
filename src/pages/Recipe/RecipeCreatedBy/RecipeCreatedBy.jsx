import s from './RecipeCreatedBy.module.scss';

export const RecipeCreatedBy = ({ name, avatar }) => {
  const avatarPlaceholder = process.env.PUBLIC_URL + '/avatar-placeholder.svg';
  return (
    <button className={s.recipe_created_by}>
      <div className={s.avatar_wrap}>
        <img src={avatar || avatarPlaceholder} alt={name} />
      </div>
    </button>
  );
};
