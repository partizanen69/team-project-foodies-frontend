import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import s from './TitleInput.module.scss'; 

const TitleInput = ({ register, errors }) => {
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = () => {
        setIsTyping(true);
    };

    return (
        <div className={s.input_container}>
            <input
                type="text"
                {...register('title', {
                    onChange: handleInputChange
                })}
                placeholder='The name of the recipe'
                className={`${s.add_recipe_form_title} ${isTyping ? s.typing_text : ''}`}
            />
            <ErrorMessage error={errors?.title} />
        </div>
    );
};

export default TitleInput;