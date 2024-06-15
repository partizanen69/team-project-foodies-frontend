import axios from 'axios';
import { handleAxiosError } from './api.utils';

export const getUserDetailsById = async ({ id }) => {
  try {
    const result = await axios.get(`/users/user-details/${id}`);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const updateAvatar = async formData => {
  try {
    const result = await axios.patch(`/users/avatars`, formData);
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const getUserFollowers = async ({ id, page = 1, limit = 9 }) => {
  try {
    const result = await axios.get('/users/followers', {
      params: {
        userId: id,
        page,
        limit,
      },
    });
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const getUserFollowing = async ({ page = 1, limit = 9 }) => {
  try {
    const result = await axios.get('/users/following', {
      params: {
        page,
        limit,
      },
    });
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const followUser = async id => {
  try {
    const result = await axios.post('/users/following', { followingId: id });
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const unfollowUser = async id => {
  try {
    const result = await axios.delete('/users/following', {
      data: { followingId: id },
    });
    return result.data;
  } catch (err) {
    handleAxiosError(err);
  }
};
