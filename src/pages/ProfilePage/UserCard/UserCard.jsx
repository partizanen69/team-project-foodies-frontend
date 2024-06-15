import s from './UserCard.module.scss';
import RoundButton from 'components/RoundButton/RoundButton';
import PropTypes from 'prop-types';
import { followUser, getUserFollowers, unfollowUser } from 'api/users';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setList } from '../../../redux/reducers/listReducer';
import { useEffect, useState } from 'react';

const BASE_IMAGE_URL = process.env.REACT_APP_BACKEND_AVATAR;

const getImageSrc = image => {
  if (!image) return `${process.env.PUBLIC_URL}/avatar-placeholder.svg`;
  return image.startsWith('https://') ? image : `${BASE_IMAGE_URL}${image}`;
};

const UserCard = props => {
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setViewWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewWidth]);

  const dispatch = useDispatch();
  const { id: userId } = useParams();

  // const [isLoading, setIsLoading] = useState(true);

  const {
    _id,
    name,
    avatarURL,
    recipesCount,
    isFollowing = true,
    recipes,
  } = props.user;

  const follow = () => {
    (async () => {
      try {
        if (!userId || !_id) {
          return;
        }
        await followUser(_id);
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
        if (!userId || !_id) {
          return;
        }
        await unfollowUser(_id);
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

  return (
    <li className={s.user_card}>
      <div className={s.wrapper}>
        <img
          className={s.avatar}
          src={getImageSrc(avatarURL)}
          alt="user avatar"
        />
        <div>
          <h3 className={s.name}>{name}</h3>
          <p className={s.text}>Own recipes: {recipesCount}</p>
          {isFollowing ? (
            <button className={s.follow_button} onClick={unfollow}>
              Following
            </button>
          ) : (
            <button className={s.follow_button} onClick={follow}>
              Follow
            </button>
          )}
        </div>
      </div>
      {viewWidth >= 768 && viewWidth < 1440 && (
        <ul className={s.recipe_list}>
          {recipes.slice(0, 3).map(recipe => {
            return (
              <li key={recipe._id}>
                <img
                  className={s.recipe_image}
                  src={getImageSrc(avatarURL)}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
      )}
      {viewWidth >= 1440 && (
        <ul className={s.recipe_list}>
          {recipes.map(recipe => {
            return (
              <li key={recipe._id}>
                <img
                  className={s.recipe_image}
                  src={getImageSrc(avatarURL)}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
      )}
      <RoundButton
        onClick={() => {
          window.location.href = `/team-project-foodies-frontend/user/${_id}/recipies`;
        }}
      />
    </li>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    recipesCount: PropTypes.number.isRequired,
    recipes: PropTypes.array.isRequired,
    isFollowing: PropTypes.bool,
  }),
};

export default UserCard;
