import { Api } from "./../api/Api";

export const TodoApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    todolist: builder.query({
      query: (data) => ({
        url: "/todos",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data}`,
        },
      }),
      providesTags: ["todos"],
    }),
    addTodo: builder.mutation({
      query: ({ data, token }) => ({
        url: "/todos",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["todos"],
    }),
    toggleDone: builder.mutation({
      query: ({ data, token }) => ({
        url: `/todos/${data}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      invalidatesTags: ["todos"],
    }),
    toggleEditable: builder.mutation({
      query: ({ data, token }) => ({
        url: `/todos/editable/${data}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      invalidatesTags: ["todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ data, token }) => ({
        url: `/todos/${data}`,
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ data, token, id }) => ({
        url: `/todos/edit/${id}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useTodolistQuery,
  useAddTodoMutation,
  useToggleDoneMutation,
  useToggleEditableMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = TodoApi;
