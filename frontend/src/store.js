import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";

import userReducer from "./slices/userSlice";

const persistStateToLocalStorage = (storeApi) => (next) => (action) => {
  //calls the reducer. let the reducer perform the action first
  const result = next(action);

  const state = storeApi.getState();

  if (action.type.startsWith("cart")) {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }

  if (action.type.startsWith("user")) {
    if (action.type === "user/removeUser") localStorage.removeItem("user");
    else localStorage.setItem("user", JSON.stringify(state.user));
  }

  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(persistStateToLocalStorage),
});

export default store;
