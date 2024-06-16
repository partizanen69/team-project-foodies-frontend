import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import s from './DescriptionInput.module.scss';

const DescriptionInput = ({ register, name, errors, maxLength }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value.slice(0, maxLength));
    setIsTyping(true);
  };

  return (
    <div className={s.add_recipe_form_description_wrap}>
      <div className={s.add_recipe_form_description}>
        <input
          {...register(name)}
          type="text"
          value={inputValue}
          maxLength={maxLength}
          onChange={handleChange}
          placeholder="Enter a description of the dish"
          className={s.add_recipe_form_description_input}
        />
        <div className={s.character_count}>
          <span style={{ color: inputValue.length > 0 ? 'rgba(5, 5, 5, 1)' : 'rgba(5, 5, 5, 0.6)' }}>
            {inputValue.length}
          </span>
          <span>/{maxLength}</span>
        </div>
      </div>

      {errors[name] && !isTyping && <ErrorMessage error={errors[name]} />}
      <div className={s.bottom_border}></div>
    </div>
  );
};

export default DescriptionInput;