import React, { useEffect, useState } from 'react';
import AddRecipeFormLabel from '../AddRecipeFormLabel/AddRecipeFormLabel';

import s from './TimeInput.module.scss';

const TimeInput = ({ register, getValues, setValue, errors }) => {
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    const currentValue = getValues('time') || 0;
    setDisplayTime(`${currentValue} min`); 
  }, [getValues]);

  const incrementTime = () => {
    const currentValue = getValues('time') || 0;
    const newValue = currentValue + 1;
    setValue('time', newValue);
    setDisplayTime(`${newValue} min`);
  };

  const decrementTime = () => {
    const currentValue = getValues('time') || 0;
    const newValue = currentValue - 1 >= 0 ? currentValue - 1 : 0;
    setValue('time', newValue);
    setDisplayTime(`${newValue} min`);
  };

  return (
    <div className={s.add_recipe_form_time}>
      <AddRecipeFormLabel>Cooking time</AddRecipeFormLabel>
      <div className={s.add_recipe_form_time_buttons}>
        <button
          type="button"
          onClick={decrementTime}
          className={s.add_recipe_form_time_button}
        >-</button>
        <input
          type="text"
          value={displayTime}
          readOnly {...register('time')}
          className={s.add_recipe_form_time_input}
        /> 
        <button
          type="button"
          onClick={incrementTime}
          className={s.add_recipe_form_time_button}
        >+</button>
      </div>
      {errors.time && <p className="error">{errors.time.message}</p>}
    </div>
  );
};

export default TimeInput;