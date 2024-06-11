// SignInSignUpForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { login, register } from '../../redux/actions/authActions';
import { ReactComponent as EyeClosedIcon } from '../../assets/icons/eye-closed-icon.svg';
import { ReactComponent as EyeOpenIcon } from '../../assets/icons/eye-open-icon.svg';

import s from './SignInSignUpForm.module.scss';

const SignInSignUpForm = ({ isModalSignInOpen, isModalSignUpOpen, closeModal, openModal }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    closeModal();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
    closeModal();
  };

  return (
    <div className="sign-in-form">
      <h2 className={s.modal_title}>{isModalSignInOpen ? 'SIGN IN' : 'SIGN UP'}</h2>
      <form onSubmit={isModalSignInOpen ? handleLogin : handleRegister}>
        {isModalSignUpOpen && (
          <input
            className={s.modal_input}
            type="text"
            name="name"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className={s.modal_input}
          type="email"
          name="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={s.password_input_wrapper}>
          <input
            className={s.modal_input}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password && (
            isPasswordVisible ? (
              <EyeOpenIcon className={s.eye_icon} onClick={() => setIsPasswordVisible(false)} />
            ) : (
              <EyeClosedIcon className={s.eye_icon} onClick={() => setIsPasswordVisible(true)} />
            )
          )}
        </div>
        <button className={s.modal_btn} type="submit" disabled={loading}>
          {loading ? (isModalSignInOpen ? 'Signing In...' : 'Signing Up...') : (isModalSignInOpen ? 'SIGN IN' : 'CREATE')}
        </button>
      </form>
      <p className={s.modal_text}>
        {isModalSignInOpen ? "Don't have an account? " : "I already have an account? "}
        <button type="button" className={s.modal_text_button} onClick={() => {
          closeModal();
          openModal(isModalSignInOpen ? 'sign up' : 'sign in');
        }}>
          {isModalSignInOpen ? "Create an account" : "Sign in"}
        </button>
      </p>
    </div>
  );
};

SignInSignUpForm.propTypes = {
  isModalSignInOpen: PropTypes.bool.isRequired,
  isModalSignUpOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default SignInSignUpForm;