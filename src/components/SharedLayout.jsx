import React, { useState, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Form from './SignInSignUpForm/Form';
import { fetchCurrentUser } from '../redux/actions/authActions';
const LogoutForm = lazy(() => import('./LogoutForm/LogoutForm'));
const Header = lazy(() => import('./Header/Header'));
const Modal = lazy(() => import('./Modal/Modal'));

export const SharedLayout = () => {
  const dispatch = useDispatch();

  const [isModalSignInOpen, setIsModalSignInOpen] = useState(false);
  const [isModalSignUpOpen, setIsModalSignUpOpen] = useState(false);
  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const openModal = action => {
    if (action === 'sign in') {
      setIsModalSignInOpen(true);
    } else if (action === 'sign up') {
      setIsModalSignUpOpen(true);
    } else if (action === 'log out') {
      setIsModalLogOutOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalSignInOpen(false);
    setIsModalSignUpOpen(false);
    setIsModalLogOutOpen(false);
  };

  return (
    <>
      <Header openModal={openModal} />
      <Outlet context={{ openModal }} />
      <Modal
        isOpen={isModalSignInOpen || isModalSignUpOpen}
        onClose={closeModal}
      >
        <Form
          isModalSignInOpen={isModalSignInOpen}
          isModalSignUpOpen={isModalSignUpOpen}
          closeModal={closeModal}
          openModal={openModal}
        />
      </Modal>
      {isModalLogOutOpen && (
        <Modal isOpen={isModalLogOutOpen} onClose={closeModal}>
          <LogoutForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default SharedLayout;
