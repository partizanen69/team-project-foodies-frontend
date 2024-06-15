import s from './ProfileInfo.module.scss';
import { Suspense, useEffect, useState } from 'react';

import Modal from 'components/Modal/Modal';
import LogoutForm from 'components/LogoutForm/LogoutForm';
import Loader from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';

import {
  followUser,
  getUserDetailsById,
  getUserFollowers,
  unfollowUser,
} from 'api/users';
import { useLocation, useNavigate } from 'react-router-dom';
import { setFavorites, setList } from '../../../redux/reducers/listReducer';
import DetailsList from './DetailsList/DetailsList';
import { Avatar } from './Avatar/Avatar';
import { showError } from 'api/api.utils';
import { selectLimit } from '../../../redux/selectors';

const ProfileInfo = ({ userId, isOwnProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setuserDetails] = useState({});
  const location = useLocation();
  const locationList = location.pathname.split('/');
  const pageName = locationList[locationList.length - 1];
  const limit = useSelector(selectLimit);

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
    navigate('/');
  };

  const follow = () => {
    (async () => {
      try {
        if (!userId) {
          return;
        }
        await followUser(userDetails.id);
        setuserDetails(prevState => {
          return {
            ...prevState,
            followersCount: userDetails.followersCount + 1,
            isFollowing: true,
          };
        });
        if (pageName === 'followers') {
          const data = await getUserFollowers({
            id: userId,
            page: 1,
            limit,
          });
          dispatch(setList(data.followers));
        }
      } catch (error) {
        showError(error.message);
      }
    })();
  };

  const unfollow = () => {
    (async () => {
      try {
        if (!userId) {
          return;
        }
        await unfollowUser(userDetails.id);
        setuserDetails(prevState => {
          return {
            ...prevState,
            followersCount: userDetails.followersCount - 1,
            isFollowing: false,
          };
        });
        if (pageName === 'followers') {
          const data = await getUserFollowers({
            id: userId,
            page: 1,
            limit,
          });
          dispatch(setList(data.followers));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        if (!userId) {
          return;
        }

        const data = await getUserDetailsById({ id: userId });
        setuserDetails(data);
        dispatch(setFavorites(data.favorites));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, userId]);

  return (
    <Suspense fallback={<Loader />}>
      <div className={s.profile_info}>
        <div className={s.profile_info_card}>
          <Avatar avatar={userDetails.avatarURL} isOwnProfile={isOwnProfile} />

          <p className={s.user_name}>
            {isLoading || !userDetails.name ? `User name` : userDetails.name}
          </p>

          <DetailsList
            userDetails={userDetails}
            isLoading={isLoading}
            isOwnProfile={isOwnProfile}
          />
        </div>
        {isOwnProfile ? (
          <button type="submit" className={s.btn_logout} onClick={openModal}>
            Log Out
          </button>
        ) : userDetails.isFollowing ? (
          <button className={s.btn_logout} onClick={unfollow}>
            Following
          </button>
        ) : (
          <button className={s.btn_logout} onClick={follow}>
            Follow
          </button>
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
