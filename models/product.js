import mongoose from "mongoose";
const schema = mongoose.Schema;

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

const Product = mongoose.model("product", productSchema);
export { Product };
