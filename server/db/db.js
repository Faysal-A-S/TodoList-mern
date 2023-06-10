import mongoose from "mongoose";
const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@todolist.pi8db9r.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("db connected");
  } catch (err) {
    console.log(err.message);
  }
};
export default Connection;
