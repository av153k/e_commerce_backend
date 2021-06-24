import { Router } from "express";
import * as authController from "../controllers/authController";
import { auth } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/user", auth, authController.getUser);

export { authRouter };
