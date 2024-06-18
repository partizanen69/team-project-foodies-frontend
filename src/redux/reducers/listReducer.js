import { createSlice } from '@reduxjs/toolkit';

const pages = {
  recipies: 'recipies',
  favorites: 'favorites',
  followers: 'followers',
  following: 'following',
};

const initialState = {
  pageName: pages.recipies,
  page: 1,
  limit: 9,
  favorites: 0,
  list: [],
  isLoading: false,
  error: null,
  totalUsers: 0,
  following: 0,
  followers: 0,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    removeFromList: (state, action) => {
      state.list = state.list.filter(recipe => recipe._id !== action.payload);
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
});

export const {
  setList,
  setPage,
  setPageName,
  setFavorites,
  setIsLoading,
  removeFromList,
  setLimit,
  setTotalUsers,
  setFollowing,
  setFollowers,
} = listSlice.actions;
export default listSlice.reducer;
