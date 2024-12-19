import { createSlice } from "@reduxjs/toolkit";
import { initialOptions } from "../utils/constants";

function getUserFromLocalStorage() {
  if (window.localStorage.getItem("user"))
    return JSON.parse(window.localStorage.getItem("user"));
  return null;
}

const initialUserState = {
  name: "",
  email: "",
  _id: "",
  isAdmin: "",
  token: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: getUserFromLocalStorage() || initialUserState,
  reducers: {
    addUser(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },

    removeUser(state, action) {
      Object.keys(initialUserState).forEach((key) => {
        state[key] = initialUserState[key];
      });
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
