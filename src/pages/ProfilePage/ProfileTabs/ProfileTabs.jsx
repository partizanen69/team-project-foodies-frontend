import { NavLink, Outlet, useLocation } from 'react-router-dom';
import s from './ProfileTabs.module.scss';

const ProfileTabs = ({ userId, isOwnProfile }) => {
  const location = useLocation();

  const getNavLinkClass = ({ isActive }) => (isActive ? s.active : '');

  return (
    <div className={s.tabs_container}>
      <ul className={s.tabs_list}>
        <li className={s.tab_item}>
          <NavLink
            to={`/user/${userId}/recipies`}
            state={{ from: location }}
            className={getNavLinkClass}
          >
            {isOwnProfile ? 'My recipes' : 'Recipes'}
          </NavLink>
        </li>

        {isOwnProfile && (
          <li className={s.tab_item}>
            <NavLink
              to={`/user/${userId}/favorites`}
              state={{ from: location }}
              className={getNavLinkClass}
            >
              My favorites
            </NavLink>
          </li>
        )}

        <li className={s.tab_item}>
          <NavLink
            to={`/user/${userId}/followers`}
            state={{ from: location }}
            className={getNavLinkClass}
          >
            Followers
          </NavLink>
        </li>

        {isOwnProfile && (
          <li className={s.tab_item}>
            <NavLink
              to={`/user/${userId}/following`}
              state={{ from: location }}
              className={getNavLinkClass}
            >
              Following
            </NavLink>
          </li>
        )}
      </ul>
      <Outlet />
    </div>
  );
};

export default ProfileTabs;
