import { Router } from "express";
import * as cartController from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/cart/:id", cartController.getCart);
cartRouter.post("/cart/:id", cartController.updateCartProduct);
cartRouter.delete("/cart/:userId/:itemId", cartController.deleteCartProduct);

export { cartRouter };
