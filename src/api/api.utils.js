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

const AVATAR_BASE_URL = process.env.REACT_APP_BACKEND_AVATAR;
export const getImageSrc = image => {
  try {
    if (!image) {
      return `${process.env.PUBLIC_URL}/image-placeholder.svg`;
    }

    return image.startsWith('http') ? image : resolveImagePath(image);
  } catch (err) {
    return `${process.env.PUBLIC_URL}/image-placeholder.svg`;
  }
};

const resolveImagePath = imageSrc => {
  const imagePath = imageSrc.startsWith('public')
    ? pathJoin(AVATAR_BASE_URL, ...imageSrc.split('/').slice(1))
    : pathJoin(AVATAR_BASE_URL, ...imageSrc.split('/'));

  return imagePath;
};

const pathJoin = (...args) => {
  const path = [];
  for (const _pathChunk of args) {
    let pathChunk = '';
    if (_pathChunk.endsWith('/')) {
      pathChunk = _pathChunk.slice(0, pathChunk.length - 1);
    }

    if ((pathChunk || _pathChunk).startsWith('/')) {
      pathChunk = pathChunk.slice(1);
    }

    path.push(pathChunk || _pathChunk);
  }

  return path.join('/');
};
