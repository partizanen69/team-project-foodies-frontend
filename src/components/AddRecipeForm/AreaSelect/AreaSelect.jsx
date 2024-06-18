import React from 'react';
import { Controller } from 'react-hook-form';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from 'components/Icon/Icon';
import s from './AreaSelect.module.scss';

const AreaSelect = ({ control, areas, errors }) => (
  <div className={s.area_select_container}>
    <AddRecipeFormLabel>Area</AddRecipeFormLabel>
    <Controller
      name="area"
      control={control}
      render={({ field }) => (
        <div className={s.area_select_wrapper}>
          <select
            {...field}
            className={`${s.area_select} ${
              field.value ? s.area_selected : s.area_placeholder
            }`}
          >
            <option key="default" value="" className={s.area_select_option}>
              Select an area
            </option>
            {areas.map(area => (
              <option key={area.name} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
          <span>
            <Icon name={'icon-arrow-drop-down'} className={s.area_select_dropdown_icon}/>
          </span>
        </div>
      )}
    />
    <ErrorMessage error={errors?.area} />
  </div>
);

export default AreaSelect;
