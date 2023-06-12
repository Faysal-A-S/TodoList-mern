import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "all",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export default filterSlice.reducer;
export const { updateFilter } = filterSlice.actions;
