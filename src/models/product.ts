import mongoose from "mongoose";
const schema = mongoose.Schema;

interface ProductInterface extends mongoose.Document{
  title: string,
  description: string,
  category: string,
  price: number,
  addedAt: Date,
}

const productSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model<ProductInterface>("product", productSchema);
export { Product };
