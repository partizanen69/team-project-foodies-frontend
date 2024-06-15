export const selectCurrentUser = state => {
  return state.auth.user;
};

export const selectList = state => {
  return state.list.list;
};

export const selectFavorites = state => {
  return state.list.favorites;
};

export const selectPage = state => {
  return state.list.page;
};

export const selectListLoading = state => {
  return state.list.isLoading;
};

export const selectPageLimit = state => {
  return state.list.limit;
};
