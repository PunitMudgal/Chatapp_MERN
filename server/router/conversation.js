import { Router } from "express";
const router = Router();
import * as controller from "../controllers/conversation.js";

router.route("/").post(controller.newConversation);

router.route("/:userId").get(controller.getConvoSingleUser);
router
  .route("/find/:firstUserId/:secondUserId")
  .get(controller.getConvoTwoUsers);

export default router;
