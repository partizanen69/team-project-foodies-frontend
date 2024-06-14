import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader/Loader';

import s from './LogoutForm.module.scss';

const LogoutForm = ({ handleLogOut, closeModal }) => {
  const { loading } = useSelector(state => state.auth);

  return (
    <>
      <h2 className={s.logout_title}>LOG OUT</h2>
      <p className={s.logout_text}>You can always log back in at my time.</p>
      <div className={s.logout_buttons}>
        <button onClick={handleLogOut} className={s.logout_btn} type="button">
          LOGOUT
        </button>
        <button onClick={closeModal} className={s.logout_btn} type="button">
          CANCEL
        </button>
      </div>
      {loading && (
        <div className={s.loader_overlay}>
          <Loader />
        </div>
      )}
    </>
  );
};

LogoutForm.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default LogoutForm;
