import React from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close-icon.svg';

import s from './AddIngredientCard.module.scss';

const AddIngredientCard = ({ removeIngredientCard, ingredientCards }) => {
    return (
        <div className={s.add_recipe_form_ingredient_card_container}>
            {ingredientCards.map((card, index) => (
                <div key={`ingredient-card-${index}`} className={s.ingredient_card}>
                    <div className={s.ingredient_info}>
                        <img src={card.img} className={s.add_recipe_form_ingredient_card_img} alt={card.name} />
                        <div className={s.add_recipe_form_ingredient_card_text}>
                            <h4 className={s.ingredient_card_name}>{card.name}</h4>
                            <p className={s.ingredient_card_measure}>{card.measure}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => removeIngredientCard(index)}
                        className={s.add_recipe_form_close_button}
                    >
                        <CloseIcon className={s.add_recipe_form_close_icon} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AddIngredientCard;