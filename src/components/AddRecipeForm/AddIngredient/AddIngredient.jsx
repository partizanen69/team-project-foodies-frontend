import React from 'react';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import icons from '../../../assets/icons/icons.svg';
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
  return (
    <div className={s.add_recipe_form_ingredients}>
      <Controller
        name="selectedIngredient"
        control={control}
        render={({ field }) => (
          <div className={s.add_recipe_form_ingredient_input}>
            <AddRecipeFormLabel>Ingredients</AddRecipeFormLabel>

            <div className={s.add_recipe_form_ingredient_select_wrap}>
              <div className={s.add_recipe_form_ingredient_select_wrapper}>
                <select
                  {...field}
                  className={`${s.add_recipe_form_ingredient_input_select} ${
                    field.value === ''
                      ? s.ingredient_placeholder
                      : s.ingredient_selected
                  }`}
                >
                  <option
                    key="default"
                    value=""
                    className={s.add_recipe_form_ingredient_input_option}
                  >
                    Add the ingredient
                  </option>
                  {ingredientsList.map(ingredient => (
                    <option
                      key={ingredient._id}
                      value={ingredient._id}
                      className={
                        s.add_recipe_form_ingredient_input_ingredient_option
                      }
                    >
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                <svg className={s.add_recipe_select_dropdown_icon}>
                  <use xlinkHref={`${icons}#${'icon-arrow-drop-down'}`}></use>
                </svg>
              </div>
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
              <svg className={s.add_recipe_form_ingredient_input_button_icon}>
                  <use xlinkHref={`${icons}#${'icon-plus'}`}></use>
                </svg>
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default AddIngredient;
