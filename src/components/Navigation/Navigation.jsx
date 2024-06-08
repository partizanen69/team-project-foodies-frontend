import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './Navigation.module.scss';

const Navigation = ({ isSidebarOpen, closeSidebar }) => {
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
        <nav className={`${s.navigation} ${isSidebarOpen ? s.navigation_open : s.navigation_close}`}>
          <div className={s.nav_header_wrapper}>
            <NavLink to="/" className={s.logo} onClick={closeSidebar}>foodies</NavLink>
            <button  onClick={closeSidebar} type='button' className={s.header_btn}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 7L7 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7L21 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className={s.nav__link_wrapper}>
            <NavLink onClick={closeSidebar} className={s.nav__link} to="/">HOME</NavLink>
            <NavLink onClick={closeSidebar} className={s.nav__link} to="/add">ADD RECIPE</NavLink>
          </div>
        </nav>
      ) : (
        <nav className={s.header_navigation}>
          <nav className={s.header_nav}>
            <NavLink className={s.nav__link} to="/">HOME</NavLink>
            <NavLink className={s.nav__link} to="/add">ADD RECIPE</NavLink>
          </nav>
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