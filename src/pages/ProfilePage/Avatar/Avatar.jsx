import { getAvatarSrc } from 'api/api.utils';
import s from './Avatar.module.scss';
import { updateAvatar } from 'api/users';
import Icon from 'components/Icon/Icon';
import { useEffect, useState } from 'react';

export const Avatar = ({ avatar, isOwnProfile }) => {
  const [userAvatar, setUserAvatar] = useState(avatar);

  useEffect(() => {
    setUserAvatar(avatar);
  }, [avatar]);

  const handleFileChange = async event => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await updateAvatar(formData);
      const uniqueQueryString = `updated=${new Date().getTime()}`;
      setUserAvatar(`${response.avatarURL}?${uniqueQueryString}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.profile_avatar_block}>
      <img
        alt="User avatar"
        src={getAvatarSrc(userAvatar)}
        className={s.profile_avatar}
        onError={() => setUserAvatar(null)}
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
    </div>
  );
};

Avatar.propTypes = {};
