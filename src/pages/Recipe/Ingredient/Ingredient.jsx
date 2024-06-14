import s from './Ingredient.module.scss';

export const Ingredient = ({ ingredient }) => {
  return (
    <li className={s.ingredient}>
      <div className={s.img_wrap}>
        <img src={ingredient.img} alt={ingredient.name} />
      </div>
      <div className={s.description}>
        <div className={s.name}>{ingredient.name}</div>
        <div className={s.measure}>{ingredient.measure}</div>
      </div>
    </li>
  );
};
