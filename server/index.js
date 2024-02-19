import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";

import connectDb from "./config/connectDB.js";
import authRoutes from "./router/auth.js";
import userRoutes from "./router/user.js";
import conversationRotues from "./router/conversation.js";
import messageRoute from "./router/message.js";

dotenv.config();

const app = express();

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/** ROUTES */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/conversation", conversationRotues);
app.use("/message", messageRoute);

const port = process.env.PORT || 8081;
const server = app.listen(port, () => {
  console.log(`server connected at http://localhost:${port}`);
});

/** WEB-SOCKET */
const wss = new WebSocketServer({ server });
wss.on("connection", (connection) => {
  console.log("connected");
  // connection.send("hello");
});

/** DATABASE SETUP */
connectDb();
