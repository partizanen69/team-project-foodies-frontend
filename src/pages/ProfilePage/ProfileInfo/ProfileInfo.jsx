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
import {
  setFavorites,
  setFollowers,
  setFollowing,
  setList,
  setRecipes,
} from '../../../redux/reducers/listReducer';
import DetailsList from './DetailsList/DetailsList';
import { Avatar } from './Avatar/Avatar';
import { showError } from 'api/api.utils';
import { selectFollowers, selectLimit } from '../../../redux/selectors';
import { toast } from 'react-toastify';

const ProfileInfo = ({ userId, isOwnProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const limit = useSelector(selectLimit);
  const followers = useSelector(selectFollowers);

  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);

  const locationList = location.pathname.split('/');
  const pageName = locationList[locationList.length - 1];

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
        setUserDetails(prevState => {
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

        dispatch(setFollowers(followers + 1));
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
        setUserDetails(prevState => {
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

        dispatch(setFollowers(followers - 1));
      } catch (error) {
        toast.error(`Error occured: ${error.message}`);
        console.error(error);
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
        setUserDetails(data);
        dispatch(setRecipes(data.recipesCount));
        dispatch(setFavorites(data.favorites));
        dispatch(setFollowers(data.followersCount));
        dispatch(setFollowing(data.followingCount));
      } catch (error) {
        toast.error(`Error occured: ${error.message}`);
        console.error(error);
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
          <button type="button" className={s.btn_logout} onClick={openModal}>
            Log Out
          </button>
        ) : userDetails.isFollowing ? (
          <button type="button" className={s.btn_logout} onClick={unfollow}>
            Following
          </button>
        ) : (
          <button type="button" className={s.btn_logout} onClick={follow}>
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
