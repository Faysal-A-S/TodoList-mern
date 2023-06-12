import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: {},
};
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});
export default todoSlice.reducer;
export const { getTodos } = todoSlice.actions;
