import { React, useEffect, useState, lazy } from 'react';
import { ReactComponent as Burger } from '../../assets/icons/burger-bar.svg';
import { NavLink } from 'react-router-dom';

import Navigation from '../Navigation/Navigation'
import s from './Header.module.scss';

const Modal = lazy(() => import('../Modal/Modal'));

const Header = () => {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [isDropDownShown, setIsDropDownShown] = useState(false);
	const [hasAvatar, setHasAvatar] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

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
	}

	const toggleDropDown = () => {
		setIsDropDownShown(!isDropDownShown);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
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

	return (

		<div className={s.header_container}>
			<NavLink to="/" className={s.logo}>foodies</NavLink>
			{(isSidebarOpen || (!isMobile && isLoggedIn)) && <Navigation isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />}
			{isLoggedIn ? (
				// Render this when isLoggedIn is true
				<div className={s.profile_bar_wrapper}>
					<div onClick={toggleDropDown} className={s.profile_bar}>
						<span className={s.avatar_wrapper}><img src={hasAvatar ? process.env.PUBLIC_URL + '/test_avatar.jpg' : process.env.PUBLIC_URL + '/avatar-placeholder.svg'} alt="avatar" className={s.avatar} /></span>
						<p className={s.profile_bar_name}>Victoria</p>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<button type='button' onClick={openSidebar} className={s.burger_btn}>
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M24.5 11.6665H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.5 7H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.5 16.3335H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.5 21H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>

					{isDropDownShown && (
						<div className={s.dropdown_menu}>
							<NavLink className={s.dropdown_menu_link} to="">PROFILE</NavLink>
							<div className={s.dropdown_menu_link_img}>
								<NavLink className={s.dropdown_menu_link} to="/logout">LOG OUT</NavLink>
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5.25 12.75L12.75 5.25" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M5.25 5.25H12.75V12.75" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</div>
						</div>
					)}
				</div>
			) : (
				// Render this when isLoggedIn is false
				<div className={s.profile_bar_wrapper}>
					<div className={s.profile_bar_unauthenticated}>
						<button type='button' onClick={openModal} className={s.sign_in_block}>SIGN IN</button>
						<button type='button' className={s.sign_up_block}>SIGN UP</button>
					</div>

					<Modal isOpen={isModalOpen} onClose={closeModal}>
						<div className="sign-in-form">
							<h2 className={s.modal_title}>SIGN IN</h2>
							<form>						
								<input className={s.modal_input} type="email" name="email" placeholder='Email*'/>
								<input className={s.modal_input} type="password" name="password" placeholder='Password'/>
								<button className={s.modal_btn} type="submit">SIGN IN</button>			
							</form>
							<p className={s.modal_text}>Don't have an account? <a href="/signup" className={s.modal_text_link}>Create an account</a></p>
						</div>
					</Modal>
				</div>
			)}
		</div>
	);
};

Header.propTypes = {
};

export default Header;