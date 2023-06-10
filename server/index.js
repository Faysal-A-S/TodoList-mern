import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Connection from "./db/db.js";
import router from "./routes/Routes.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);
const PORT = 9000;
Connection(process.env.USERNAME_DB, process.env.PASSWORD_DB);
app.listen(PORT, () => {
  console.log("server running");
});
