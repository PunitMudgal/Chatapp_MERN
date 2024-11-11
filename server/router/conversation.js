import express from "express";
import * as controller from "../controllers/conversation.js";
import Auth from "../middleware/authorization.js";
const router = express.Router();

router.post("/", Auth, controller.createConversation);

router.get("/:userId", Auth, controller.getUserConversations);
router.get(
  "/find/:firstUserId/:secondUserId",
  Auth,
  controller.getConvoTwoUsers
);

router.put("/update-last-message", Auth, controller.updateLastMessage);

router.delete(
  "delete-conversation/:conversationId",
  Auth,
  controller.deleteConversation
);

export default router;
