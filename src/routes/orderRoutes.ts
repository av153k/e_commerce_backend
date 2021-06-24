import { Router } from "express";
import * as orderController from "../controllers/orderController";

const orderRouter = Router();

orderRouter.get("/order/:id", orderController.getOrder);
orderRouter.post("/order/:id", orderController.checkout);

export { orderRouter };
