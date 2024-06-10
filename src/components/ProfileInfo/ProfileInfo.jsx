import styles from './ProfileInfo.module.scss';

const ProfileInfo = () => {
  return (
    <div className={styles.profile_info}>
      <div className={styles.profile_info_card}>
        <div>
          <img alt="User avatar" />
          <p>Username</p>
          <button type="button">+</button>
        </div>

        <div className={styles.profile_info_details}>
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

export default ProfileInfo;
