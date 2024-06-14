import s from './DetailsList.module.scss';

const DetailsList = ({ userDetails, isLoading, isOwnProfile }) => {
  return (
    <ul className={s.details_list}>
      <li className={s.details_list_item}>
        <p className={s.item_key}>Email: </p>
        <span className={s.item_value}>
          {isLoading ? 0 : userDetails.email}
        </span>
      </li>

      <li className={s.details_list_item}>
        <p className={s.item_key}>Added recipes: </p>
        <span className={s.item_value}>
          {isLoading ? 0 : userDetails.recipesCount}
        </span>
      </li>

      {isOwnProfile && userDetails.hasOwnProperty('favorites') && (
        <li className={s.details_list_item}>
          <p className={s.item_key}>Favorites: </p>
          <span className={s.item_value}>
            {isLoading ? 0 : userDetails.favorites}
          </span>
        </li>
      )}

      <li className={s.details_list_item}>
        <p className={s.item_key}>Followers: </p>
        <span className={s.item_value}>
          {isLoading ? 0 : userDetails.followersCount}
        </span>
      </li>

      {isOwnProfile && userDetails.hasOwnProperty('followingCount') && (
        <li className={s.details_list_item}>
          <p className={s.item_key}>Following: </p>
          <span className={s.item_value}>
            {isLoading ? 0 : userDetails.followingCount}
          </span>
        </li>
      )}
    </ul>
  );
};

export default DetailsList;
