import { Product } from "../models/product";
import { Request, Response } from "express";

export function getProducts(_: Request, res: Response) {
  Product.find()
    .sort({ date: -1 })
    .then((products) => res.json(products));
}
export function postProduct(req: Request, res: Response) {
  const newProduct = new Product(req.body);
  newProduct.save().then((product) => res.json(product));
}
export function updateProduct(req: Request, res: Response) {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    (updated) => {
      if (updated) {
        Product.findOne({ _id: req.params.id }).then((product) =>
          res.json(product)
        );
      }
    }
  );
}
export function deleteProduct(req: Request, res: Response) {
  Product.findByIdAndDelete({ _id: req.params.id }).then((deleted) => {
    if (deleted) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
}

// export { getProducts, postProduct, updateProduct, deleteProduct };
