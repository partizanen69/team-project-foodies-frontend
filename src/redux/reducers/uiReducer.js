import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMainPage: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMainPage: (state, action) => {
      state.isMainPage = action.payload;
    },
  },
});

export const { setIsMainPage } = uiSlice.actions;
export default uiSlice.reducer;
