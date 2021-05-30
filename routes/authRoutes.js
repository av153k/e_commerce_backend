import { Router } from "express";
import * as authController from "../controllers/authController";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", auth, authController.getUser);

export { router };
