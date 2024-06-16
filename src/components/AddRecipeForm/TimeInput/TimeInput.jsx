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
    const currentValue = getValues('time');
    if (!currentValue) return;
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
        ><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H19" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
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
        ><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V19" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 12H19" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
      </div>
      {errors && <p className={s.add_recipe_form_error}>{errors.message}</p>}
    </div>
  );
};

export default TimeInput;