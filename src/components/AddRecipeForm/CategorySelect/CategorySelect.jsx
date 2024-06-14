import React from 'react';
import { Controller } from 'react-hook-form';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import s from './CategorySelect.module.scss';

const CategorySelect = ({ control, categories, errors }) => (
  <div className={s.category_select_container}>
    <AddRecipeFormLabel>Category</AddRecipeFormLabel>
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className={s.category_select}
        >
          <option key="default" value="" className={s.category_select_option}>Select a category</option>
          {categories.map(category => (
            <option key={category.name} value={category.id}>{category.name}</option>
          ))}
        </select>
      )}
    />
    {errors.category && <p className="error">{errors.category.message}</p>}
  </div>
);

export default CategorySelect;
