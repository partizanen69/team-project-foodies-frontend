import React from 'react';
import { Controller } from 'react-hook-form';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import icons from '../../../assets/icons/icons.svg';
import s from './CategorySelect.module.scss';

const CategorySelect = ({ control, categories, errors }) => (
  <div className={s.category_select_container}>
    <AddRecipeFormLabel>Category</AddRecipeFormLabel>
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <div className={s.category_select_wrapper}>
          <select
            {...field}
            className={`${s.category_select} ${
              field.value ? s.category_selected : s.category_placeholder
            }`}
          >
            <option key="default" value="" className={s.category_select_option}>
              Select a category
            </option>
            {categories.map(category => (
              <option key={category.name} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <svg className={s.category_select_dropdown_icon}>
            <use xlinkHref={`${icons}#${'icon-arrow-drop-down'}`}></use>
          </svg>
        </div>
      )}
    />

    <ErrorMessage error={errors?.category} />
  </div>
);

export default CategorySelect;
