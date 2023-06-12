import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../features/api/Api";
import UserSlice from "../features/user/UserSlice";
import TodoSlice from "../features/Todo/TodoSlice";
import filterSlice from "./../features/Filter/FilterSlice";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    authUser: UserSlice,
    todo: TodoSlice,
    filter: filterSlice,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(Api.middleware),
});
