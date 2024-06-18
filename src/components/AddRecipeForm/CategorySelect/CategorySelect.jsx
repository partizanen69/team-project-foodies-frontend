import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from 'components/Icon/Icon';
import s from './CategorySelect.module.scss';

const CategorySelect = ({ control, categories, errors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className={s.category_select_container}>
      <AddRecipeFormLabel>Category</AddRecipeFormLabel>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <div className={s.category_select_wrapper}>
            <div
              className={`${s.category_select} ${isOpen ? s.category_is_open : ''}`}
              onClick={toggleDropdown}
            >
              {selectedCategory ? (
                <span className={s.category_selected_text}>
                  {selectedCategory.name}
                </span>
              ) : (
                <span className={s.category_placeholder}>
                  Select a category
                </span>
              )}
              {isOpen
                ? <Icon
                  name={'icon-chevron-down'}
                  className={s.category_select_dropdown_icon}
                />
                : <Icon
                  name={'icon-arrow-drop-down'}
                  className={s.category_select_dropdown_icon}
                />
              }
            </div>
            {isOpen && (
              <div className={s.category_select_option}>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={`${s.category_select__dropdown_item} ${selectedCategory
                      && selectedCategory._id === category._id ? s.category_selected : ''}`}
                    onClick={() => {
                      handleSelect(category);
                      field.onChange(category._id);
                    }}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
      <ErrorMessage error={errors?.category} />
    </div>
  );
};

export default CategorySelect;
