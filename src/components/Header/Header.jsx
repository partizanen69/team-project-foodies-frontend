import { React, useEffect, useState } from 'react';

import s from './Header.module.scss';

const Header = () => {
	const [isLoggedIn, setisLoggedIn] = useState(false);

	const logIn = () => {
    setisLoggedIn(true);  
  };
	return (
		<div className={s.header_container}>
			<p className={s.logo}>foodies</p>

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
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M24.5 11.6665H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M24.5 7H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M24.5 16.3335H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M24.5 21H3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			) : (
				// Render this when isLoggedIn is false
				<div className={s.profile_bar_wrapper}>
					<div className={s.profile_bar_unauthenticated}>
						<span onClick={logIn} className={s.sign_in_block}>SIGN IN</span>
						<span className={s.sign_up_block}>SIGN UP</span>
					</div>
				</div>
			)}
		</div>
	);
};

Header.propTypes = {
};

export default Header;