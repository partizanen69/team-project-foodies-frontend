import React, { useState } from 'react';
import s from './TitleInput.module.scss'; 

const TitleInput = ({ register, errors, title }) => {
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = () => {
        setIsTyping(true);
    };

    return (
        <div>
            <input
                type="text"
                {...register('title')}
                placeholder='The name of the recipe'
                className={`${s.add_recipe_form_title} ${isTyping ? s.typing_text : ''}`}
                onChange={handleInputChange}
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
    );
};

export default TitleInput;
