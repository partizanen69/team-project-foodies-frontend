import PropTypes from 'prop-types';
import s from './ProfileInfo.module.scss';
import { useEffect, useState } from 'react';

import { getUserDetails } from 'api/users';
import Icon from 'components/Icon';

const ProfileInfo = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        if (!userId) {
          return;
        }

        const data = await getUserDetails({ id: userId });
        console.log(data);
        setuserDetails(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  return (
    <div className={s.profile_info}>
      <div className={s.profile_info_card}>
        <div className={s.profile_avatar_block}>
          <img
            alt="User avatar"
            src={userDetails.avatarURL}
            className={s.profile_avatar}
          />
          <button type="button" className={s.btn_add_avatar}>
            <Icon name="icon-plus" width="16" height="16" className={s.plus} />
          </button>
        </div>

        <p className={s.user_name}>
          {isLoading ? `Loading...` : userDetails.name}
        </p>

        <ul className={s.details_list}>
          <li className={s.details_list_item}>
            <p className={s.item_key}>Email: </p>
            <span className={s.item_value}>
              {isLoading ? `Loading...` : userDetails.email}
            </span>
          </li>

          <li className={s.details_list_item}>
            <p className={s.item_key}>Added recipes: </p>
            <span className={s.item_value}>
              {isLoading ? `Loading...` : userDetails.recipesCount}
            </span>
          </li>

          {userDetails.hasOwnProperty('favorites') && (
            <li className={s.details_list_item}>
              <p className={s.item_key}>Favorites: </p>
              <span className={s.item_value}>
                {isLoading ? `Loading...` : userDetails.favorites}
              </span>
            </li>
          )}

          <li className={s.details_list_item}>
            <p className={s.item_key}>Followers: </p>
            <span className={s.item_value}>
              {isLoading ? `Loading...` : userDetails.followersCount}
            </span>
          </li>

          {userDetails.hasOwnProperty('followingCount') && (
            <li className={s.details_list_item}>
              <p className={s.item_key}>Following: </p>
              <span className={s.item_value}>
                {isLoading ? `Loading...` : userDetails.followingCount}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileInfo;
