import React, { useState } from 'react';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import s from './InstructionsInput.module.scss';


const InstructionsInput = ({ register, name, errors, maxLength }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value.slice(0, maxLength));
    setIsTyping(true);
  };

  return (
    <div className={s.add_recipe_form_instructions}>
      <AddRecipeFormLabel>Recipe Preparation</AddRecipeFormLabel>
      <div className={s.add_recipe_form_instructions_wrap}>
        
        <div className={s.add_recipe_form_counter}>
          <input
            {...register(name)}
            type="text"
            value={inputValue}
            maxLength={maxLength}
            onChange={handleChange}
            placeholder="Enter recipe"
            className={s.add_recipe_form_instructions_input}
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
    </div>
  );
};


export default InstructionsInput;
