import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/user", auth, authController.getUser);

export { authRouter };
