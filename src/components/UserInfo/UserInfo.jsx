import styles from './UserInfo.module.scss';

const UserInfo = () => {
  return (
    <div className={styles.user_info}>
      <div className={styles.user_info_card}>
        <div>
          <img alt="user avatar" />
          <p>Username</p>
          <button type="button">+</button>
        </div>

        <div className={styles.user_info_details}>
          <div>
            <p>Email: </p>
            <span>email</span>
          </div>

          <div>
            <p>Added recipes: </p>
            <span>number</span>
          </div>

          <div>
            <p>Favorites: </p>
            <span>number</span>
          </div>

          <div>
            <p>Followers: </p>
            <span>number</span>
          </div>

          <div>
            <p>Following: </p>
            <span>number</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
