import React from 'react';
import { Controller } from 'react-hook-form';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import s from './CategorySelect.module.scss';

const CategorySelect = ({ control, categories, errors }) => (
  <div className={s.category_select_container}>
    <AddRecipeFormLabel>Category</AddRecipeFormLabel>
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <div className={s.select_wrapper}>
          <select
            {...field}
            className={`${s.category_select} ${field.value ? s.category_selected : s.category_placeholder}`}
          >
            <option key="default" value="" className={s.category_select_option}>Select a category</option>
            {categories.map(category => (
              <option key={category.name} value={category.id}>{category.name}</option>
            ))}
          </select>
          <div className={s.select_arrow}></div>
        </div>
      )}
    />

    <ErrorMessage error={errors?.category} />
  </div>
);

export default CategorySelect;