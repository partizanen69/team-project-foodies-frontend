import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { logout } from '../../redux/actions/authActions';
import s from './LogoutForm.module.scss';

const LogoutForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);
  const [, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    closeModal();
    navigate('/');
  };

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
  closeModal: PropTypes.func.isRequired,
};

export default LogoutForm;
