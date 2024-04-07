import { configureStore } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
import { combineReducers } from "redux";
import productSlice from "./slices/productSlice";
import productDetailsSlice from "./slices/productDetailsSlice";
import userSlice from "./slices/userSlice";
import cart from "./slices/cart";
const rootReducer = combineReducers({
  productSlice: productSlice,
  productDetailsSlice:productDetailsSlice,
  userSlice:userSlice,
  cartSlice:cart
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add thunk middleware
  devTools: true // This line enables Redux DevTools Extension
});

export default store;
