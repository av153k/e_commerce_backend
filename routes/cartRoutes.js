import { Router } from "express";
import * as cartController from "../controllers/cartController";

const router = Router();

router.get("/cart/:id", cartController.geCart);
router.post("/cart/:id", cartController.upadteCart);
router.delete("/cart/:userId/:itemId", cartController.deleteCardProduct);

export default { router };
