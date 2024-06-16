import React from 'react';
import s from './ErrorMessage.module.scss'; 

const ErrorMessage = ({ error }) => {
    if (!error) {
        return null;
    }

    return (
        <p className={s.error_message}>{error.message}</p>
    );
};

export default ErrorMessage;