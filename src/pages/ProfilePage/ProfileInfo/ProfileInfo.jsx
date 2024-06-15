import s from './ProfileInfo.module.scss';
import { Suspense, useEffect, useState } from 'react';

import Modal from 'components/Modal/Modal';
import LogoutForm from 'components/LogoutForm/LogoutForm';
import Loader from 'components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';

import {
  followUser,
  getUserDetailsById,
  getUserFollowers,
  unfollowUser,
} from 'api/users';
import { useNavigate } from 'react-router-dom';
import { setList } from '../../../redux/reducers/listReducer';
import DetailsList from './DetailsList/DetailsList';
import { Avatar } from './Avatar/Avatar';

const ProfileInfo = ({ userId, isOwnProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          return { ...prevState, isFollowing: true };
        });
        const data = await getUserFollowers({
          id: userId,
          page: 1,
          limit: 9,
        });
        dispatch(setList(data.followers));
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
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
          return { ...prevState, isFollowing: false };
        });
        const data = await getUserFollowers({
          id: userId,
          page: 1,
          limit: 9,
        });
        dispatch(setList(data.followers));
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
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
