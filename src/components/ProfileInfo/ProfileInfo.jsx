import s from './ProfileInfo.module.scss';
import { Suspense, useEffect, useState } from 'react';

import { getUserDetails } from 'api/users';
import Icon from 'components/Icon';
import Modal from 'components/Modal/Modal';
import LogoutForm from 'components/LogoutForm/LogoutForm';
import Loader from 'components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { UpdateAvatar } from './UpdateAvatar/UpdateAvatar';

const ProfileInfo = ({ userId }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userDetails, setuserDetails] = useState({});

  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) {
          return;
        }

        const data = await getUserDetails({ id: userId });
        setuserDetails(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

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

  return (
    <Suspense fallback={<Loader />}>
      <div className={s.profile_info}>
        <div className={s.profile_info_card}>
          <div className={s.profile_avatar_block}>
            <img
              alt="User avatar"
              src={userDetails.avatarURL}
              className={s.profile_avatar}
            />

            <UpdateAvatar userId={userId} />
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

        <button type="submit" className={s.btn_logout} onClick={openModal}>
          Log Out
        </button>
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
