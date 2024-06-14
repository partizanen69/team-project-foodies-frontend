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

export const getAvatarSrc = avatar => {
  const AVATAR_BASE_URL = process.env.REACT_APP_BACKEND_AVATAR;

  if (!avatar) {
    return `${process.env.PUBLIC_URL}/avatar-placeholder.svg`;
  }

  return avatar.startsWith('http') ? avatar : `${AVATAR_BASE_URL}${avatar}`;
};
