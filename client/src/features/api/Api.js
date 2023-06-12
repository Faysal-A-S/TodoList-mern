import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-list-mern-woad.vercel.app/",
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({}),
});
