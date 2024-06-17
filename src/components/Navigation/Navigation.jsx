import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import icons from '../../assets/icons/icons.svg';
import s from './Navigation.module.scss';

const Navigation = ({ isSidebarOpen, closeSidebar }) => {
  const isMainPage = useSelector(state => state.ui.isMainPage);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <nav
          className={`${s.navigation} ${
            isSidebarOpen ? s.navigation_open : s.navigation_close
          }`}
        >
          <div className={s.nav_header_wrapper}>
            <NavLink to="/" className={s.logo} onClick={closeSidebar}>
              foodies
            </NavLink>
            <button
              onClick={closeSidebar}
              type="button"
              className={s.header_btn}
            >
              <svg className={s.header_close_icon}>
                <use xlinkHref={`${icons}#${'icon-close'}`} x="2" y="2"></use>
              </svg>
            </button>
          </div>
          <div className={s.nav__link_wrapper}>
            <NavLink onClick={closeSidebar} className={s.nav__link} to="/">
              HOME
            </NavLink>
            <NavLink onClick={closeSidebar} className={s.nav__link} to="/add">
              ADD RECIPE
            </NavLink>
            <div className={s.images}>
              <div className={s.image_main}></div>
              <div className={s.image_secondary}></div>
            </div>
          </div>
        </nav>
      ) : (
        <nav
          className={
            isMainPage ? s.header_navigation : s.header_navigation__light
          }
        >
          <NavLink className={s.nav__link} to="/">
            HOME
          </NavLink>
          <NavLink className={s.nav__link} to="/add">
            ADD RECIPE
          </NavLink>
        </nav>
      )}
    </>
  );
};

Navigation.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default Navigation;
