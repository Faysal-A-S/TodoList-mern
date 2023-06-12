import express from "express";
import { userRegister, userLogin } from "../Controller/UserController.js";
import requireAuth from "../middleware/requireAuth.js";
import {
  TodoList,
  addTodo,
  toggleDone,
  toggleEdit,
  updateTodo,
  deleteTodo,
} from "../Controller/TodoController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.use(requireAuth);
router.get("/todos", TodoList);
router.post("/todos", addTodo);
router.post("/todos/:id", toggleDone);
router.post("/todos/editable/:id", toggleEdit);
router.post("/todos/edit/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);
export default router;
