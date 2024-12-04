import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";

const persistStateToLocalStorage = (storeApi) => (next) => (action) => {
  //calls the reducer. let the reducer perform the action first
  const result = next(action);

  const state = storeApi.getState();

  if (action.type.startsWith("cart")) {
    console.log("saving to localstorage")
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }

  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(persistStateToLocalStorage),
});

export default store;
