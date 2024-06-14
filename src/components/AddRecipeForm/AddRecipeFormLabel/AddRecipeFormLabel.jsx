import React from 'react';
import s from '../AddRecipeFormLabel/AddRecipeFormLabel.module.scss';

const AddRecipeFormLabel = ({ children }) => (
  <label className={s.add_recipe_form_label}>
    {children}
  </label>
);

export default AddRecipeFormLabel;