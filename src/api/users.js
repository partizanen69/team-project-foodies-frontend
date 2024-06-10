import axios from 'axios';

export const getUserDetails = async ({ id } = {}) => {
  const result = await axios.get(`/users/user-details/${id}`);

  return result.data;
};
