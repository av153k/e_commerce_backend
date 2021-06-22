import { Router } from "express";
import * as productController from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/product", productController.getProducts);
productRouter.post("/product", productController.postProduct);
productRouter.put("/product/:id", productController.updateProduct);
productRouter.delete("/product/:id", productController.deleteProduct);

export { productRouter };
