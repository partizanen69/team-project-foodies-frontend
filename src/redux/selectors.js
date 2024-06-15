export const selectCurrentUser = state => {
  return state.auth.user;
};

export const selectList = state => {
  return state.list.list;
};
