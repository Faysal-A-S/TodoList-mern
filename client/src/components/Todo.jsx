import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  useDeleteTodoMutation,
  useToggleDoneMutation,
  useToggleEditableMutation,
  useUpdateTodoMutation,
} from "../features/Todo/TodoApi";

const Todo = () => {
  let { todos } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.authUser);
  const { filter } = useSelector((state) => state.filter);

  let { todos: data } = todos;
  const [toggleDone] = useToggleDoneMutation();
  const [toggleEditable] = useToggleEditableMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  data = data?.length > 0 ? data : [];
  const [text, setText] = useState("");
  const handleEdit = (todo) => {
    toggleEditable({ data: todo._id, token: user.Token });
    setText(todo.text);
  };
  const handleEditOnsubmit = ({ token, data, id }) => {
    updateTodo({ data, token, id });
    toggleEditable({ data: id, token: user.Token });
  };
  return (
    <div>
      {data
        ?.filter((todo) => {
          if (filter === "done") {
            return todo.done === true;
          }
          if (filter === "active") {
            return todo.done === false;
          }
          return todo;
        })
        .map((todo) => (
          <li
            key={todo._id}
            className="todo p-2 mb-2 text-start position-relative d-flex "
          >
            <span
              className={`ps-2 fw-bold  ${
                todo.done ? "text-decoration-line-through" : ""
              }`}
              style={{ display: `${todo.editable ? "none" : ""}` }}
              onClick={() => toggleDone({ data: todo._id, token: user.Token })}
            >
              {todo.text}
            </span>

            <div
              className="flex-fill "
              style={{
                display: `${todo.editable ? "" : "none"}`,
              }}
            >
              <div className=" col-md-8 col-lg-8">
                <input
                  type="text"
                  value={text}
                  className="form-control fs-6  edit-form"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>

            <div className="position-absolute top-0 end-0 ">
              {todo.editable ? (
                <button
                  className="btn text-success"
                  style={{ border: "none" }}
                  onClick={() =>
                    handleEditOnsubmit({
                      id: todo._id,
                      token: user.Token,
                      data: { text: text },
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              ) : (
                <button
                  className="btn text-white"
                  style={{ border: "none" }}
                  onClick={() => handleEdit(todo)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              )}
              <button
                className="btn text-danger "
                style={{ border: "none" }}
                onClick={() =>
                  deleteTodo({ data: todo._id, token: user.Token })
                }
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </li>
        ))}
    </div>
  );
};

export default Todo;
