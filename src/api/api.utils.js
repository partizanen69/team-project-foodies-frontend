import { toast } from 'react-toastify';

export const handleAxiosError = err => {
  const msgPrefix = 'Request failed with error:';
  console.error('http request failed with error', err);
  if (err.name === 'AxiosError') {
    throw new Error(
      `${msgPrefix} ${
        err.response?.data?.message || err.message
      } and status text ${err.response?.statusText || err.code}`
    );
  }
  throw new Error(`${msgPrefix} ${err.message}`);
};

export const showError = msg => {
  toast.error(msg, {
    autoClose: 5000,
  });
};

export const getAvatarSrc = avatar => {
  const AVATAR_BASE_URL = process.env.REACT_APP_BACKEND_AVATAR;
  try {
    if (!avatar) {
      return `${process.env.PUBLIC_URL}/avatar-placeholder.svg`;
    }

    return avatar.startsWith('http') ? avatar : `${AVATAR_BASE_URL}${avatar}`;
  } catch (err) {
    return `${process.env.PUBLIC_URL}/avatar-placeholder.svg`;
  }
};

export const getImageSrc = image => {
  const AVATAR_BASE_URL = process.env.REACT_APP_BACKEND_AVATAR;
  try {
    if (!image) {
      return `${process.env.PUBLIC_URL}/image-placeholder.svg`;
    }

    return image.startsWith('http') ? image : `${AVATAR_BASE_URL}${image}`;
  } catch (err) {
    return `${process.env.PUBLIC_URL}/image-placeholder.svg`;
  }
};
