import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/user/UserSlice";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useTodolistQuery,
} from "../features/Todo/TodoApi";
import { getTodos } from "../features/Todo/TodoSlice";
import { updateFilter } from "../features/Filter/FilterSlice";

const Todolist = () => {
  const { user } = useSelector((state) => state.authUser);
  let { todos } = useSelector((state) => state.todo);
  let { todos: todoData } = todos;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { data } = useTodolistQuery(user.Token);
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [activeTab, setActiveTab] = useState("all");
  todoData = todoData?.length > 0 ? todoData : [];
  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.clear();
    navigate("/");
  };
  const handleRemoveDone = () => {
    todoData.forEach(({ done, _id }) => {
      if (done) {
        deleteTodo({ data: _id, token: user.Token });
      }
    });
  };
  useEffect(() => {
    dispatch(getTodos({ ...data }));
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(updateFilter(activeTab));
  }, [dispatch, activeTab]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo({ data: { text, done: false }, token: user.Token });
    setText("");
  };
  return (
    <div className="text-center position-relative">
      <h1>
        Welcome &nbsp;
        <span className="fw-bolder" style={{ color: "#553939" }}>
          {user?.name?.toUpperCase()}
        </span>
      </h1>
      <button
        onClick={handleLogOut}
        className="btn btn-danger position-absolute top-0 end-0"
      >
        LOGOUT
      </button>
      <div className="todoBox mx-auto mt-1  align-items-center p-5 mt-5">
        <form className="row mb-4" onSubmit={handleSubmit}>
          <div className="col-lg-8 col-md-8  col-sm-12">
            <input
              type="text"
              className="form-control "
              onChange={(e) => setText(e.target.value)}
              value={text}
              required
            />
          </div>

          <div className="col-lg-4 col-md-4  col-sm-12">
            <button className="btn btn-dark col-12 ">Add Todo</button>
          </div>
        </form>

        <div className="d-flex position-relative mt-2 mb-3">
          <button
            className={`btn fw-bold ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            ALL
          </button>
          <button
            className={`btn fw-bold ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            ACTIVE
          </button>
          <button
            className={`btn fw-bold ${activeTab === "done" ? "active" : ""}`}
            onClick={() => setActiveTab("done")}
          >
            DONE
          </button>
          {todoData.some((todo) => todo.done) ? (
            <button
              className="btn btn-danger position-absolute top-0 end-0 fw-bold "
              onClick={() => handleRemoveDone()}
            >
              REMOVE DONE
            </button>
          ) : null}
        </div>
        <Todo />
      </div>
    </div>
  );
};

export default Todolist;
