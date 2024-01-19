import { Router } from "express";
const router = Router();
import * as controller from "../controllers/message.js";

router.route("/").post(controller.sendMessage);
router.route("/:conversationId").get(controller.getMessage);

export default router;
