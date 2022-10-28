import { createSlice } from '@reduxjs/toolkit';

export type LayoutReducerState = {
  isMobile: boolean;
  darkMode: boolean;
  sidebar: {
    collapsed: boolean;
  };
};

const initialState: LayoutReducerState = {
  isMobile: false,
  darkMode: false,
  sidebar: {
    collapsed: false,
  },
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setDarkMode: (state, { payload }) => {
      state.darkMode = payload;
    },
    setCollapsed: (state, { payload }) => {
      state.sidebar.collapsed = payload;
    },
    setIsMobile: (state, { payload }) => {
      state.isMobile = payload;
    },
    clearState: (state) => {
      state.darkMode = false;
      state.sidebar = {
        collapsed: false,
      };
      return state;
    },
  },
});

export default layoutSlice.reducer;

export const { setDarkMode, setCollapsed, clearState } = layoutSlice.actions;
