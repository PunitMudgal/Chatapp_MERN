import express from "express";
import { getUser, searchUser, updateUser } from "../controllers/user.js";
import Auth from "../middleware/authorization.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/search/:name", searchUser);
router.patch("/updateUser", updateUser);

export default router;
