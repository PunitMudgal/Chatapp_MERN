import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";

import connectDb from "./config/connectDB.js";
import authRoutes from "./router/auth.js";

dotenv.config();

const app = express();

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//IMAGE FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./serverImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/** ROUTES */
app.use("/auth", authRoutes);

const port = process.env.PORT || 8081;
const server = app.listen(port, () => {
  console.log(`server connected at http://localhost:${port}`);
});

/** WEB-SOCKET */
const wss = new WebSocketServer({ server });
wss.on("connection", (connection) => {
  console.log("connected");
  // function notifyAboutOnlinePeople() {
  //   [..]
});

/** DATABASE SETUP */
connectDb();
