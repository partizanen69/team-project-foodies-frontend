import React from 'react';

const TextAreaInput = ({ label, register, name, errors, maxLength, watch }) => {
  const value = watch(name) || '';

  return (
    <div>
      <label>{label}</label>
      <textarea {...register(name)} maxLength={maxLength} />
      <p>{value.length}/{maxLength}</p>
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default TextAreaInput;
