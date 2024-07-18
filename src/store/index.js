import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import uiSlice from './ui-slice';
import grocerySlice from './grocery-slice';
import cartSlice from './cart-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    grocery: grocerySlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
