import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticatedUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      state.user = {};
    },
  },
});
export default userSlice.reducer;
export const { authenticatedUser, logOut } = userSlice.actions;
