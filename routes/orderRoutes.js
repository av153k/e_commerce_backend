import { Router } from "express";
import * as orderController from "../controllers/orderController";

const router = Router();

router.get("/order/:id", orderController.get_order);
router.post("/order/:id", orderController.checkout);

export { router };
