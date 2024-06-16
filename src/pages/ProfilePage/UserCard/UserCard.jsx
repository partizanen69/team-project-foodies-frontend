import s from './UserCard.module.scss';
import RoundButton from 'components/RoundButton/RoundButton';
import {
  followUser,
  getUserFollowers,
  getUserFollowing,
  unfollowUser,
} from 'api/users';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowing, setList } from '../../../redux/reducers/listReducer';
import { useEffect, useState } from 'react';
import {
  selectCurrentUser,
  selectLimit,
  selectPage,
} from '../../../redux/selectors';
import { getAvatarSrc, showError } from 'api/api.utils';
import RecipeImage from './RecipeImage/RecipeImage';

const UserCard = props => {
  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const currentPage = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  const location = useLocation();
  const locationList = location.pathname.split('/');
  const pageName = locationList[locationList.length - 1];
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    function handleResize() {
      setViewWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewWidth]);

  const dispatch = useDispatch();
  const { id: userId } = useParams();

  const {
    _id,
    name,
    avatarURL,
    recipesCount,
    isFollowing = true,
    recipes,
  } = props.user;
  const [followingState, setFollowingState] = useState(isFollowing);

  const follow = () => {
    (async () => {
      try {
        if (!userId || !_id) {
          return;
        }
        const following = await followUser(_id);
        const data = await getUserFollowers({
          id: userId,
          page: currentPage,
          limit,
        });
        dispatch(setList(data.followers));

        if (currentUser.id === userId) {
          dispatch(setFollowing(following.following.length));
        }

        setFollowingState(true);
      } catch (error) {
        showError(error.message);
      }
    })();
  };

  const unfollow = () => {
    (async () => {
      try {
        if (!userId || !_id) {
          return;
        }
        const following = await unfollowUser(_id);
        if (pageName === 'followers') {
          const data = await getUserFollowers({
            id: userId,
            page: currentPage,
            limit,
          });
          dispatch(setList(data.followers));
        } else if (pageName === 'following') {
          const data = await getUserFollowing({
            id: userId,
            page: currentPage,
            limit,
          });
          dispatch(setList(data.following));
        }

        if (currentUser.id === userId) {
          dispatch(setFollowing(following.following.length));
        }

        setFollowingState(false);
      } catch (error) {
        showError(error.message);
      }
    })();
  };

  return (
    <>
      {name !== undefined && (
        <li className={s.user_card}>
          <div className={s.wrapper}>
            <img
              className={s.avatar}
              src={getAvatarSrc(avatarURL)}
              alt="user avatar"
            />
            <div>
              <h3 className={s.name}>{name}</h3>
              <p className={s.text}>Own recipes: {recipesCount}</p>
              {followingState ? (
                <button className={s.follow_button} onClick={unfollow}>
                  Following
                </button>
              ) : (
                <button
                  className={`${s.follow_button} ${
                    currentUser.id === _id && s.disabled
                  }`}
                  onClick={follow}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          {viewWidth >= 768 && viewWidth < 1440 && (
            <ul className={s.recipe_list}>
              {recipes.slice(0, 3).map(recipe => (
                <RecipeImage key={recipe._id} recipe={recipe} />
              ))}
            </ul>
          )}
          {viewWidth >= 1440 && (
            <ul className={s.recipe_list}>
              {recipes.map(recipe => (
                <RecipeImage key={recipe._id} recipe={recipe} />
              ))}
            </ul>
          )}
          <RoundButton onClick={() => navigate(`/user/${_id}/recipies`)} />
        </li>
      )}
    </>
  );
};

export default UserCard;
