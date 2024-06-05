import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './Navigation.module.scss';

const Navigation = ({ isSidebarOpen, closeSidebar }) => {


	return (
		<nav className={`${s.navigation} ${isSidebarOpen ? s.navigation_open : s.navigation_close}`}>
			<div className={s.nav_header_wrapper}>
				<NavLink to="/" className={s.logo} onClick={closeSidebar}>foodies</NavLink>

				<button onClick={closeSidebar} type='button' className={s.header_btn}>
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M21 7L7 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M7 7L21 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>

				</button>
			</div>

			<div className={s.nav__link_wrapper}>
				<NavLink onClick={closeSidebar} className={s.nav__link} to="/">HOME</NavLink>
				<NavLink  onClick={closeSidebar} className={s.nav__link} to="/add">ADD RECIPE</NavLink>
			</div>

		</nav>

	);
};

Navigation.propTypes = {
	isSidebarOpen: PropTypes.bool.isRequired,
	closeSidebar: PropTypes.func.isRequired,
};

export default Navigation;