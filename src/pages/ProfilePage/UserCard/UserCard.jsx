import RoundButton from 'components/RoundButton/RoundButton';
import s from './UserCard.module.scss';
import PropTypes from 'prop-types';
import { followUser, getUserFollowers, unfollowUser } from 'api/users';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setList } from '../../../redux/reducers/listReducer';

const BASE_URL = process.env.REACT_APP_BACKEND_AVATAR;

const getImageSrc = image => {
  if (!image) return `${process.env.PUBLIC_URL}/avatar-placeholder.svg`;
  return image.startsWith('https://') ? image : `${BASE_URL}${image}`;
};

const UserCard = props => {
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
    <li>
      <div>
        <img src={getImageSrc(avatarURL)} alt="" />
        <div>
          <h3>{name}</h3>
          <p>Own recipes: {recipesCount}</p>
          {isFollowing ? (
            <button onClick={unfollow}>Following</button>
          ) : (
            <button onClick={follow}>Follow</button>
          )}
        </div>
        <ul>
          {recipes.map(recipe => {
            return (
              <li key={recipe._id}>
                <img src={getImageSrc(avatarURL)} alt="" />
              </li>
            );
          })}
        </ul>
        <RoundButton
          onClick={() => {
            window.location.href = `/user/${_id}/recipies`;
          }}
        />
      </div>
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
