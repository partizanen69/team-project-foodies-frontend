import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import s from './Avatar.module.scss';
import { updateAvatar } from 'api/users';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:3002/'; // change to process.env.PUBLIC_URL before deployment

export const Avatar = ({ avatar }) => {
  const [userAvatar, setUserAvatar] = useState(avatar);

  useEffect(() => {
    setUserAvatar(avatar);
  }, [avatar]);

  const getAvatarSrc = avatar => {
    if (!avatar) return `${process.env.PUBLIC_URL}/avatar-placeholder.svg`;
    return avatar.startsWith('http://') ? avatar : `${BASE_URL}${avatar}`;
  };

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

      <label htmlFor="avatar" className={s.btn_add_avatar}>
        <Icon name="icon-plus" width="16" height="16" className={s.plus} />
        <input
          style={{ display: 'none' }}
          type="file"
          id="avatar"
          name="avatar"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

Avatar.propTypes = {};
