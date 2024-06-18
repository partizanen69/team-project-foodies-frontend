import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from 'components/Icon/Icon';
import s from './AreaSelect.module.scss';

const AreaSelect = ({ control, areas, errors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = area => {
    setSelectedArea(area);
    setIsOpen(false);
  };

  return (
    <div className={s.area_select_container}>
      <AddRecipeFormLabel>Area</AddRecipeFormLabel>
      <Controller
        name="area"
        control={control}
        render={({ field }) => (
          <div className={s.area_select_wrapper}>
            <div
              className={`${s.area_select} ${isOpen ? s.area_is_open : ''}`}
              onClick={toggleDropdown}
            >
              {selectedArea ? (
                <span className={s.area_selected_text}>
                  {selectedArea.name}
                </span>
              ) : (
                <span className={s.area_placeholder}>Select an area</span>
              )}
              {isOpen ? (
                <Icon
                  name={'icon-chevron-down'}
                  className={s.area_select_dropdown_icon}
                />
              ) : (
                <Icon
                  name={'icon-arrow-drop-down'}
                  className={s.area_select_dropdown_icon}
                />
              )}
            </div>
            {isOpen && (
              <div className={s.area_select_option}>
                {areas.map(area => (
                  <div
                    key={area._id}
                    className={`${s.area_select__dropdown_item} ${
                      selectedArea && selectedArea._id === area._id
                        ? s.area_selected
                        : ''
                    }`}
                    onClick={() => {
                      handleSelect(area);
                      field.onChange(area.name);
                    }}
                  >
                    {area.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
      <ErrorMessage error={errors?.area} />
    </div>
  );
};

export default AreaSelect;
