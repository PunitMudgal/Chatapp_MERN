import { Router } from "express";
const router = Router();
import * as controller from "../controllers/auth.js";

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/delete_account").delete(controller.deleteAccount);
router.route("/getAll").get(controller.getAllUsers);
export default router;
