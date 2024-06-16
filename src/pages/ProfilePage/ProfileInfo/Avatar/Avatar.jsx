import { getAvatarSrc } from 'api/api.utils';
import s from './Avatar.module.scss';
import Icon from 'components/Icon/Icon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAvatarStore,
  updateAvatarStore,
} from '../../../../redux/actions/authActions';
import Loader from 'components/Loader/Loader';

export const Avatar = ({ avatar, isOwnProfile }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  const [userAvatar, setUserAvatar] = useState(
    localStorage.getItem('avatarURL') || (user?.avatarURL ?? '')
  );

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      dispatch(updateAvatarStore(formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOwnProfile) {
      setUserAvatar(getAvatarSrc(user?.avatarURL));
    } else {
      setUserAvatar(getAvatarSrc(avatar));
    }
  }, [user?.avatarURL, avatar, isOwnProfile]);

  return (
    <div className={s.profile_avatar_block}>
      <img
        alt="User avatar"
        src={userAvatar}
        className={s.profile_avatar}
        onError={() => dispatch(setAvatarStore(null))}
      />
      {isOwnProfile && (
        <label htmlFor="avatar" className={s.btn_add_avatar}>
          <Icon name="icon-plus" className={s.plus} />
          <input
            style={{ display: 'none' }}
            type="file"
            id="avatar"
            name="avatar"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        </label>
      )}

      {loading && <Loader />}
    </div>
  );
};
Avatar.propTypes = {};
