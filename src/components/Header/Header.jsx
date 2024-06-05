import { React, useEffect, useState } from 'react';
import { ReactComponent as Burger } from '../../assets/icons/burger-bar.svg';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation'
import s from './Header.module.scss';

const Header = () => {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

	const openSidebar = () => {
		setIsSidebarOpen(true);
	}

	return (
		
		<div className={s.header_container}>
			<NavLink to="/" className={s.logo}>foodies</NavLink>

			{isLoggedIn ? (
				// Render this when isLoggedIn is true
				<div className={s.profile_bar_wrapper}>
					<div className={s.profile_bar}>
						<img src={process.env.PUBLIC_URL + '/test_avatar.jpg'} alt="avatar" className={s.avatar} />
						<p className={s.profile_bar_name}>Victoria</p>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<button type='button' onClick={openSidebar} className={s.header_btn}>
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M24.5 11.6665H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.5 7H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.5 16.3335H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.5 21H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					{/* <Burger className={s.burger}/> */}
				</div>
			) : (
				// Render this when isLoggedIn is false
				<div className={s.profile_bar_wrapper}>
					<div className={s.profile_bar_unauthenticated}>
						<button type='button' onClick={() => setisLoggedIn(true)} className={s.sign_in_block}>SIGN IN</button>
						<button className={s.sign_up_block}>SIGN UP</button>
					</div>
				</div>
			)}
			 {isSidebarOpen && <Navigation isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />}
		</div>
	);
};

Header.propTypes = {
};

export default Header;