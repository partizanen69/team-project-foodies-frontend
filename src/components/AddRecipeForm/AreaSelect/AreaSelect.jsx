import React from 'react';
import { Controller } from 'react-hook-form';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import s from './AreaSelect.module.scss';

const AreaSelect = ({ control, areas, errors }) => (
  <div className={s.area_select_container}>
    <AddRecipeFormLabel>Area</AddRecipeFormLabel>
    <Controller
      name="area"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className={s.area_select}
        >
          <option value="" className={s.area_select_option}>Select an area</option>
          {areas.map(area => (
            <option key={area.name} value={area.id}>{area.name}</option>
          ))}
        </select>
      )}
    />
    {errors.area && <p className="error">{errors.area.message}</p>}
  </div>
);

export default AreaSelect;
