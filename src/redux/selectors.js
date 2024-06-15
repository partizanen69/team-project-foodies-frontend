export const selectCurrentUser = state => {
  return state.auth.user;
};

export const selectList = state => {
  return state.list.list;
};

export const selectTotalUsers = state => {
  return state.list.totalUsers;
};

export const selectFavorites = state => {
  return state.list.favorites;
};

export const selectPage = state => {
  return state.list.page;
};

export const selectLimit = state => {
  return state.list.limit;
};

export const selectListLoading = state => {
  return state.list.isLoading;
};
