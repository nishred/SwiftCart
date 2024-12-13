import { createSlice } from "@reduxjs/toolkit";

function getUserFromLocalStorage() {
  if (window.localStorage.getItem("user"))
    return JSON.parse(window.localStorage.getItem("user"));
  return null;
}

const userSlice = createSlice({
  name: "user",
  initialState: getUserFromLocalStorage() || {},
  reducers: {
    addUser(state, action) {
      const { name, email, _id, isAdmin, token } = action.payload;
      state.name = name;
      state.email = email;
      (state._id = _id), (state.isAdmim = isAdmin), (state.token = token);
    },

    removeUser(state, action) {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
