import React, { useEffect, useState, lazy } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as BurgerBar } from '../../assets/icons/burger-bar.svg';

import s from './Header.module.scss';

const Navigation = lazy(() => import('../Navigation/Navigation'));

const Header = ({ openModal }) => {
  const { user } = useSelector(state => state.auth);
  const isMainPage = useSelector(state => state.ui.isMainPage);

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDropDownShown, setIsDropDownShown] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const toggleDropDown = () => {
    setIsDropDownShown(!isDropDownShown);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (!event.target.closest(`.${s.profile_bar}`)) {
        setIsDropDownShown(false);
      }
    };

    if (isDropDownShown) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isDropDownShown]);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <>
      <div
        className={isMainPage ? s.header_container : s.header_container__light}
      >
        <NavLink to="/" className={isMainPage ? s.logo : s.logo__dark}>
          foodies
        </NavLink>
        {(isSidebarOpen || (!isMobile && isLoggedIn)) && (
          <Navigation
            isSidebarOpen={isSidebarOpen}
            closeSidebar={closeSidebar}
          />
        )}
        {isLoggedIn ? (
          <div className={s.profile_bar_wrapper}>
            <div onClick={toggleDropDown} className={s.profile_bar}>
              <span className={s.avatar_wrapper}>
                <img
                  src={
                    user?.avatarURL
                      ? user.avatarURL
                      : process.env.PUBLIC_URL + '/avatar-placeholder.svg'
                  }
                  alt="avatar"
                  className={s.avatar}
                />
              </span>
              <div className={s.name_wrapper}>
                {user && <p className={s.profile_bar_name}>{user.name}</p>}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 6.75L9 11.25L13.5 6.75"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <button
              type="button"
              onClick={openSidebar}
              className={s.burger_btn}
            >
              <BurgerBar
                className={isMainPage ? s.burger_icon : s.burger_icon__dark}
              />
            </button>

            {isDropDownShown && (
              <div
                className={isMainPage ? s.dropdown_menu : s.dropdown_menu__main}
              >

                <NavLink
                  className={s.dropdown_menu_link}
                  to={`user/${user.id}/recipies`}
                >

                  PROFILE
                </NavLink>
                <div className={s.dropdown_menu_link_img}>
                  <button
                    className={s.dropdown_menu_link}
                    onClick={() => openModal('log out')}
                  >
                    LOG OUT
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.25 12.75L12.75 5.25"
                        stroke="white"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.25 5.25H12.75V12.75"
                        stroke="white"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={s.profile_bar_wrapper}>
            <div className={s.profile_bar_unauthenticated}>
              <button
                type="button"
                onClick={() => openModal('sign in')}
                className={s.sign_in_block}
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => openModal('sign up')}
                className={s.sign_up_block}
              >
                SIGN UP
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

Header.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Header;
