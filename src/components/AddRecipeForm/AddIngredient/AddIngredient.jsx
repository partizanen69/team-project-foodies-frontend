import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from 'components/Icon/Icon';
import s from './AddIngredient.module.scss';

const AddIngredient = ({
  control,
  ingredientsList,
  errors,
  isTyping,
  register,
  watch,
  addIngredient,
  handleMeasureChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIngredient, setselectedIngredient] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (ingredient) => {
    setselectedIngredient(ingredient);
    setIsOpen(false);
  };

  return (
    <div className={s.add_recipe_form_ingredients}>
      <Controller
        name="selectedIngredient"
        control={control}
        render={({ field }) => (
          <div className={s.add_recipe_form_ingredient_input}>
            <AddRecipeFormLabel>Ingredients</AddRecipeFormLabel>
            <div className={s.add_recipe_form_ingredient_select_wrap}>
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <div className={s.ingredient_select_wrapper}>
                    <div
                      className={`${s.ingredient_select} ${isOpen ? s.ingredient_is_open : ''}`}
                      onClick={toggleDropdown}
                    >
                      {selectedIngredient ? (
                        <span className={s.ingredient_selected_text}>
                          {selectedIngredient.name}
                        </span>
                      ) : (
                        <span className={s.ingredient_placeholder}>
                          Add the ingredient
                        </span>
                      )}
                      {isOpen ?
                        <Icon
                          name={'icon-chevron-down'}
                          className={s.add_recipe_select_dropdown_icon}
                        />
                        : <Icon
                          name={'icon-arrow-drop-down'}
                          className={s.add_recipe_select_dropdown_icon}
                        />}
                        
                    </div>
                    {isOpen && (
                      <div className={s.ingredient_select_option}>
                        {ingredientsList.map((ingredient) => (
                          <div
                            key={ingredient._id}
                            className={`${s.ingredient_select__dropdown_item} ${selectedIngredient && selectedIngredient._id === ingredient._id ? s.ingredient_selected : ''}`}
                            onClick={() => {
                              handleSelect(ingredient);
                              field.onChange(ingredient._id);
                            }}
                          >
                            {ingredient.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
              
              <input
                type="text"
                {...register('measure')}
                placeholder="Enter quantity"
                className={s.add_recipe_form_ingredient_input_measure}
                onChange={handleMeasureChange}
              />
              {errors?.ingredients && !isTyping && (
                <ErrorMessage error={errors?.ingredients} />
              )}
            </div>

            <button
              className={s.add_recipe_form_ingredient_input_button}
              type="button"
              onClick={() => {
                const selectedIngredient = ingredientsList.find(
                  ing => ing._id === watch('selectedIngredient')
                );
                const measure = watch('measure');
                if (selectedIngredient && measure) {
                  addIngredient(selectedIngredient, measure);
                } else {
                  toast.error('Please enter quantity and select ingredient');
                }
              }}
            >
              <span>Add ingredient </span>
              <Icon
                name={'icon-plus'}
                className={s.add_recipe_form_ingredient_input_button_icon}
              />
            </button>
          </div>
        )}
      />
    </div>
  );
};


export default AddIngredient;
