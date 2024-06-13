import { NavLink, Outlet, useLocation } from 'react-router-dom';
import s from './ProfileTabs.module.scss';

const ProfileTabs = ({ userId, isOwnProfile }) => {
  const location = useLocation();
  return (
    <div className={s.tabs_container}>
      <ul className={s.tabs_list}>
        <li className={s.tab_item}>
          <NavLink
            to={`/user/${userId}/recipies`}
            state={{ from: location }}
            activeclassname={s.active}
          >
            My recipes
          </NavLink>
        </li>

        {isOwnProfile && (
          <li className={s.tab_item}>
            <NavLink
              to={`/user/${userId}/favorites`}
              state={{ from: location }}
              activeclassname={s.active}
            >
              My favorites
            </NavLink>
          </li>
        )}

        <li className={s.tab_item}>
          <NavLink
            to={`/user/${userId}/followers`}
            state={{ from: location }}
            activeclassname={s.active}
          >
            Followers
          </NavLink>
        </li>

        {isOwnProfile && (
          <li className={s.tab_item}>
            <NavLink
              to={`/user/${userId}/following`}
              state={{ from: location }}
              activeclassname={s.active}
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
