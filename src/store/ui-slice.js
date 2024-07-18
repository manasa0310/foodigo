import { createSlice } from '@reduxjs/toolkit';

const initialUiState = {
  isMenuOpen: false,
  categorySelected: 'fruits',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setCategory(state, action) {
      state.categorySelected = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
