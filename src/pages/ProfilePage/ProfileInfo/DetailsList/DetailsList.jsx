import { useSelector } from 'react-redux';
import s from './DetailsList.module.scss';
import {
  selectFavorites,
  selectFollowers,
  selectFollowing,
} from '../../../../redux/selectors';

const DetailsList = ({ userDetails, isLoading, isOwnProfile }) => {
  const favorites = useSelector(selectFavorites);
  const following = useSelector(selectFollowing);
  const followers = useSelector(selectFollowers);

  return (
    <ul className={s.details_list}>
      <li className={s.details_list_item}>
        <p className={s.item_key}>Email: </p>
        <span className={s.item_value}>
          {isLoading || !userDetails.email ? 'No email' : userDetails.email}
        </span>
      </li>

      <li className={s.details_list_item}>
        <p className={s.item_key}>Added recipes: </p>
        <span className={s.item_value}>
          {isLoading || !userDetails.recipesCount
            ? 0
            : userDetails.recipesCount}
        </span>
      </li>

      {isOwnProfile && userDetails.hasOwnProperty('favorites') && (
        <li className={s.details_list_item}>
          <p className={s.item_key}>Favorites: </p>
          <span className={s.item_value}>
            {isLoading || !favorites ? 0 : favorites}
          </span>
        </li>
      )}

      <li className={s.details_list_item}>
        <p className={s.item_key}>Followers: </p>
        <span className={s.item_value}>
          {isLoading || !followers ? 0 : followers}
        </span>
      </li>

      {isOwnProfile && userDetails.hasOwnProperty('followingCount') && (
        <li className={s.details_list_item}>
          <p className={s.item_key}>Following: </p>
          <span className={s.item_value}>
            {isLoading || !following ? 0 : following}
          </span>
        </li>
      )}
    </ul>
  );
};

export default DetailsList;
