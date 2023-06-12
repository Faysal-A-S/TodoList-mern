import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  _id: String,
  text: {
    type: String,
    required: true,
    trim: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  editable: {
    type: Boolean,
    required: true,
    default: false,
  },
  user_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
