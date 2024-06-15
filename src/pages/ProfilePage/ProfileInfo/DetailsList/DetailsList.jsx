import { useSelector } from 'react-redux';
import s from './DetailsList.module.scss';
import { selectFavorites } from '../../../../redux/selectors';

const DetailsList = ({ userDetails, isLoading, isOwnProfile }) => {
  const favorites = useSelector(selectFavorites);

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
          {isLoading || !userDetails.followersCount
            ? 0
            : userDetails.followersCount}
        </span>
      </li>

      {isOwnProfile && userDetails.hasOwnProperty('followingCount') && (
        <li className={s.details_list_item}>
          <p className={s.item_key}>Following: </p>
          <span className={s.item_value}>
            {isLoading || !userDetails.followingCount
              ? 0
              : userDetails.followingCount}
          </span>
        </li>
      )}
    </ul>
  );
};

export default DetailsList;
