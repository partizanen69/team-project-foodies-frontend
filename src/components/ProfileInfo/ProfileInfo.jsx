import s from './ProfileInfo.module.scss';
import { Suspense, useEffect, useState } from 'react';

import Modal from 'components/Modal/Modal';
import LogoutForm from 'components/LogoutForm/LogoutForm';
import Loader from 'components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { Avatar } from './Avatar/Avatar';
import { getUserDetailsById } from 'api/users';

const ProfileInfo = ({ userId, isOwnProfile }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setuserDetails] = useState({});

  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);

  const openModal = () => {
    setIsModalLogOutOpen(true);
  };

  const closeModal = () => {
    setIsModalLogOutOpen(false);
  };

  const handleLogOut = () => {
    dispatch(logout());
    closeModal();
  };

  useEffect(() => {
    (async () => {
      try {
        if (!userId) {
          return;
        }

        const data = await getUserDetailsById({ id: userId });
        setuserDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  return (
    <Suspense fallback={<Loader />}>
      <div className={s.profile_info}>
        <div className={s.profile_info_card}>
          <Avatar avatar={userDetails.avatarURL} />

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

            {isOwnProfile && userDetails.hasOwnProperty('favorites') && (
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

            {isOwnProfile && userDetails.hasOwnProperty('followingCount') && (
              <li className={s.details_list_item}>
                <p className={s.item_key}>Following: </p>
                <span className={s.item_value}>
                  {isLoading ? `Loading...` : userDetails.followingCount}
                </span>
              </li>
            )}
          </ul>
        </div>

        {isOwnProfile ? (
          <button type="submit" className={s.btn_logout} onClick={openModal}>
            Log Out
          </button>
        ) : (
          <button className={s.btn_logout}>Follow</button>
        )}
      </div>

      {isModalLogOutOpen && (
        <Modal isOpen={isModalLogOutOpen} onClose={closeModal}>
          <LogoutForm handleLogOut={handleLogOut} closeModal={closeModal} />
        </Modal>
      )}
    </Suspense>
  );
};

export default ProfileInfo;
