import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../features/api/Api";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(Api.middleware),
});
