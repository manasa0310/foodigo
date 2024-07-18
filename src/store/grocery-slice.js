import { createSlice } from '@reduxjs/toolkit';

const initialGroceryState = {
  groceryItems: null,
};

const grocerySlice = createSlice({
  name: 'grocery',
  initialState: initialGroceryState,
  reducers: {
    setGroceryItems(state, action) {
      state.groceryItems = action.payload;
    },
  },
});

export const groceryActions = grocerySlice.actions;

export default grocerySlice;
