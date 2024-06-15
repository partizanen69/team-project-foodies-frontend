import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { login, register } from '../../redux/actions/authActions';
import { ReactComponent as EyeClosedIcon } from '../../assets/icons/eye-closed-icon.svg';
import { ReactComponent as EyeOpenIcon } from '../../assets/icons/eye-open-icon.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';

import s from './Form.module.scss';

const Form = ({
  isModalSignInOpen,
  isModalSignUpOpen,
  closeModal,
  openModal,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validationSchema = Yup.object().shape({
    name: isModalSignUpOpen
      ? Yup.string().required('Name is required')
      : Yup.string().nullable(),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const {
    register: registerInput,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const watchedValues = watch();

  useEffect(() => {
    if (watchedValues.name) {
      setName(watchedValues.name);
    }
    if (watchedValues.email) {
      setEmail(watchedValues.email);
    }
    if (watchedValues.password) {
      setPassword(watchedValues.password);
    }
  }, [watchedValues]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach(error => {
        toast.error(error.message);
      });
    }
  }, [errors]);

  const handleLogin = data => {
    dispatch(login(data.email, data.password)).then(() => {
      closeModal();
    });
  };

  const handleRegister = data => {
    dispatch(register(data.name, data.email, data.password)).then(() => {
      closeModal();
    });
  };

  return (
    <div className="sign-in-form">
      <h2 className={s.modal_title}>
        {isModalSignInOpen ? 'SIGN IN' : 'SIGN UP'}
      </h2>
      <form
        onSubmit={handleSubmit(
          isModalSignInOpen ? handleLogin : handleRegister
        )}
      >
        {isModalSignUpOpen && (
          <input
            className={s.modal_input}
            type="text"
            name="name"
            placeholder="Name*"
            {...registerInput('name')}
          />
        )}
        <input
          className={s.modal_input}
          type="email"
          name="email"
          placeholder="Email*"
          {...registerInput('email')}
        />
        <div className={s.password_input_wrapper}>
          <input
            className={s.modal_input}
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Password*"
            {...registerInput('password')}
          />
          {isPasswordVisible ? (
            <EyeOpenIcon
              className={s.eye_icon}
              onClick={() => setIsPasswordVisible(false)}
            />
          ) : (
            <EyeClosedIcon
              className={s.eye_icon}
              onClick={() => setIsPasswordVisible(true)}
            />
          )}
        </div>
        <button
          className={
            (isModalSignInOpen && email && password.length >= 6) ||
            (isModalSignUpOpen && name && email && password.length >= 6)
              ? s.modal_btn__active
              : s.modal_btn
          }
          type="submit"
          disabled={loading}
        >
          {isModalSignInOpen ? 'SIGN IN' : 'CREATE'}
        </button>
      </form>
      <div>
        <p className={s.modal_text}>
          {isModalSignInOpen
            ? "Don't have an account? "
            : 'I already have an account? '}
        </p>
        <button
          type="button"
          className={s.modal_text_button}
          onClick={() => {
            closeModal();
            openModal(isModalSignInOpen ? 'sign up' : 'sign in');
          }}
        >
          {isModalSignInOpen ? 'Create an account' : 'Sign in'}
        </button>
      </div>
      {loading && (
        <div className={s.loader_overlay}>
          <Loader />
        </div>
      )}
    </div>
  );
};

Form.propTypes = {
  isModalSignInOpen: PropTypes.bool.isRequired,
  isModalSignUpOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Form;
