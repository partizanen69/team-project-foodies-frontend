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
  },
});

export const { setList, setPage, setPageName, setFavorites } =
  listSlice.actions;
export default listSlice.reducer;
