import { Product } from "../models/product.js";

export function getProducts(req, res) {
  Product.find()
    .sort({ date: -1 })
    .then((products) => res.json(products));
}
export function postProduct(req, res) {
  const newProduct = new Product(req.body);
  newProduct.save().then((product) => res.json(product));
}
export function updateProduct(req, res) {
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
export function deleteProduct(req, res) {
  Product.findByIdAndDelete({ _id: req.params.id }).then((deleted) => {
    if (deleted) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
}

// export { getProducts, postProduct, updateProduct, deleteProduct };
