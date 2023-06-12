import Todo from "../Model/TodoSchema.js";
import { v4 as uuid } from "uuid";
export const TodoList = async (req, res) => {
  const user_id = req.user._id;
  try {
    const todos = await Todo.find({ user_id: user_id }).sort({
      created_at: -1,
    });
    if (todos) {
      return res.status(200).json({ todos });
    } else {
      res.status(404).json({ message: "No todos found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const addTodo = async (req, res) => {
  const user_id = req.user._id;
  const { text, done } = req.body;
  try {
    const todo = await Todo.create({
      _id: uuid(),
      text: text,
      done: done,
      user_id: user_id,
    });
    await todo.save();
    res.status(200).json({ text: todo.text, done: todo.done });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
export const toggleDone = async (req, res) => {
  const user_id = req.user._id;

  const todo_id = req.params.id;
  try {
    const todoRef = await Todo.find(
      { _id: todo_id, user_id: user_id },
      { done: 1 }
    );

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todo_id, user_id: user_id },
      { done: !todoRef[0].done }
    );
    await updatedTodo.save();

    res.status(200).json({ updatedTodo });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
export const toggleEdit = async (req, res) => {
  const user_id = req.user._id;

  const todo_id = req.params.id;
  try {
    const todoRef = await Todo.find(
      { _id: todo_id, user_id: user_id },
      { editable: 1 }
    );

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todo_id, user_id: user_id },
      { editable: !todoRef[0].editable }
    );
    await updatedTodo.save();

    res.status(200).json({ updatedTodo });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
export const deleteTodo = async (req, res) => {
  const user_id = req.user._id;

  const todo_id = req.params.id;
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: todo_id,
      user_id: user_id,
    });

    res.status(200).json({ message: deletedTodo.text });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
export const updateTodo = async (req, res) => {
  const user_id = req.user._id;

  const todo_id = req.params.id;
  try {
    const todoRef = await Todo.find(
      { _id: todo_id, user_id: user_id },
      { editable: 1 }
    );

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todo_id, user_id: user_id },
      { editable: !todoRef[0].editable, text: req.body.text }
    );
    await updatedTodo.save();

    res.status(200).json({ updatedTodo });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
