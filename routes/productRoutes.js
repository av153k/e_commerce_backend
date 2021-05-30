import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

router.get("/product", productController.getProducts);
router.post("/product", productController.postProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

export { router };
