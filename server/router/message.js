import express from "express";
import * as controller from "../controllers/message.js";
import Auth from "../middleware/authorization.js";
const router = express.Router();

router.post("/", Auth, controller.createMessage);
router.get("/:conversationId", Auth, controller.getMessages);

router.post("/mark-read/:messageId", Auth, controller.markMessageAsRead);

router.delete("delete-message/:messageId", Auth, controller.deleteMessage);

export default router;
