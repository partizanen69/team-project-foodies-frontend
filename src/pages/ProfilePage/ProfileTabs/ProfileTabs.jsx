import { NavLink, Outlet, useLocation } from 'react-router-dom';
import s from './ProfileTabs.module.scss';

const ProfileTabs = ({ userId, isOwnProfile }) => {
  const location = useLocation();

  const getNavLinkClass = ({ isActive }) =>
    `${s.tab_link} ${isActive ? s.active : ''}`;

  return (
    <div className={s.tabs_container}>
      <ul className={s.tabs_list}>
        <li className={s.tab_item}>
          <NavLink
            to={`/user/${userId}/recipies`}
            state={{ from: location }}
            className={getNavLinkClass}
          >
            {isOwnProfile ? 'MY RECIPES' : 'RECIPES'}
          </NavLink>
        </li>

        {isOwnProfile && (
          <li className={s.tab_item}>
            <NavLink
              to={`/user/${userId}/favorites`}
              state={{ from: location }}
              className={getNavLinkClass}
            >
              MY FAVORITES
            </NavLink>
          </li>
        )}

        <li className={s.tab_item}>
          <NavLink
            to={`/user/${userId}/followers`}
            state={{ from: location }}
            className={getNavLinkClass}
          >
            FOLLOWERS
          </NavLink>
        </li>

        {isOwnProfile && (
          <li className={s.tab_item}>
            <NavLink
              to={`/user/${userId}/following`}
              state={{ from: location }}
              className={getNavLinkClass}
            >
              FOLLOWING
            </NavLink>
          </li>
        )}
      </ul>
      <Outlet />
    </div>
  );
};

export default ProfileTabs;
